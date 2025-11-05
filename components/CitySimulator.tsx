import React, { useMemo } from 'react';
import { BusData } from '../types';

interface FleetVisualizerProps {
  fleetData: BusData[];
  totalEmissions: number;
}

const BusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M56 18H8C5.79 18 4 19.79 4 22V48C4 50.21 5.79 52 8 52H11C11.55 52 12 52.45 12 53C12 54.66 13.34 56 15 56C16.66 56 18 54.66 18 53C18 52.45 18.45 52 19 52H45C45.55 52 46 52.45 46 53C46 54.66 47.34 56 49 56C50.66 56 52 54.66 52 53C52 52.45 52.45 52 53 52H56C58.21 52 60 50.21 60 48V22C60 19.79 58.21 18 56 18ZM8 28V22H56V28H8ZM6 32H58V44H6V32Z" fill="currentColor"/>
    </svg>
  );

const FleetVisualizer: React.FC<FleetVisualizerProps> = ({ fleetData, totalEmissions }) => {
  const SAMPLE_SIZE = 100;

  const proportionalFleet = useMemo(() => {
    const totalBuses = fleetData.reduce((sum, bus) => sum + bus.count, 0);
    if (totalBuses === 0) {
      return [];
    }
    
    const sampleBuses: { color: string, id: string, name: string }[] = [];
    
    const sortedFleet = [...fleetData].sort((a, b) => a.count - b.count);
    let distributedCount = 0;
    for(const bus of sortedFleet) {
        const count = Math.round((bus.count / totalBuses) * SAMPLE_SIZE);
        for(let i = 0; i < count && distributedCount < SAMPLE_SIZE; i++) {
            sampleBuses.push({ color: bus.color, id: `${bus.id}-${i}`, name: bus.name });
            distributedCount++;
        }
    }

    const largestContributor = [...fleetData].sort((a, b) => b.count - a.count)[0];
    while (distributedCount < SAMPLE_SIZE && largestContributor) {
        sampleBuses.push({ color: largestContributor.color, id: `${largestContributor.id}-fill-${distributedCount}`, name: largestContributor.name });
        distributedCount++;
    }
    while (distributedCount > SAMPLE_SIZE) {
        sampleBuses.pop();
        distributedCount--;
    }

    return sampleBuses;
  }, [fleetData]);

  const smokeStyle = useMemo(() => {
    const SMOKE_START_THRESHOLD = 500000;
    const SMOKE_MAX_THRESHOLD = 1500000;

    let smokeIntensity = 0;
    if (totalEmissions > SMOKE_START_THRESHOLD) {
      smokeIntensity = (totalEmissions - SMOKE_START_THRESHOLD) / (SMOKE_MAX_THRESHOLD - SMOKE_START_THRESHOLD);
    }
    
    const p = Math.max(0, Math.min(1, smokeIntensity));
    const easedP = Math.pow(p, 1.5);

    return {
      '--smoke-color-alpha': easedP * 0.85,
      '--smoke-final-scale': 2.8 + easedP * 3.2,
      '--smoke-base-duration': `${25 - easedP * 20}s`,
      opacity: p,
    } as React.CSSProperties;
  }, [totalEmissions]);


  return (
    <div className="relative h-full min-h-[500px] lg:min-h-0 bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Visualización de la Flota y Contaminación</h2>
        <div className="relative flex-grow rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700 p-4 flex items-center justify-center">
            
            <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out"
                style={smokeStyle}
            >
                <div className="smoke-puff smoke-puff-1"></div>
                <div className="smoke-puff smoke-puff-2"></div>
                <div className="smoke-puff smoke-puff-3"></div>
                <div className="smoke-puff smoke-puff-4"></div>
                <div className="smoke-puff smoke-puff-5"></div>
            </div>
            
            {proportionalFleet.length > 0 ? (
                 <div className="relative z-10 grid grid-cols-10 gap-2">
                    {proportionalFleet.map((bus) => (
                    <div key={bus.id} title={bus.name}>
                        <BusIcon className="w-full h-full" style={{ color: bus.color }}/>
                    </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No hay autobuses en la flota.</p>
            )}

        </div>
        <div className="mt-4 text-center text-gray-400">
            <p>Cada autobús representa ~1% de la flota total.</p>
            <p>El humo aparece con emisiones &gt; 500,000 ton CO₂.</p>
        </div>

        <style>{`
            @keyframes smoke-animation {
              0% { 
                transform: translate(0, 20px) scale(0.95); 
                opacity: 0; 
              }
              15%, 85% { 
                opacity: 1; 
              }
              100% { 
                transform: translate(40px, -180px) scale(var(--smoke-final-scale, 2.5)); 
                opacity: 0; 
              }
            }
            .smoke-puff {
              position: absolute;
              background: radial-gradient(circle, rgba(110, 110, 120, var(--smoke-color-alpha, 0.4)) 0%, rgba(90, 99, 112, 0) 70%);
              border-radius: 50%;
              animation: smoke-animation linear infinite;
              animation-duration: var(--smoke-base-duration, 20s);
              will-change: transform, opacity;
            }
            .smoke-puff-1 { width: 200px; height: 200px; bottom: -100px; left: 10%; animation-delay: 0s; }
            .smoke-puff-2 { width: 150px; height: 150px; bottom: -80px; left: 60%; animation-duration: calc(var(--smoke-base-duration, 20s) * 0.8); animation-delay: -4s; }
            .smoke-puff-3 { width: 250px; height: 250px; bottom: -120px; left: 30%; animation-duration: calc(var(--smoke-base-duration, 20s) * 1.2); animation-delay: -8s; }
            .smoke-puff-4 { width: 180px; height: 180px; bottom: -90px; left: 80%; animation-duration: calc(var(--smoke-base-duration, 20s) * 0.9); animation-delay: -12s; }
            .smoke-puff-5 { width: 120px; height: 120px; bottom: -60px; left: 0%; animation-duration: calc(var(--smoke-base-duration, 20s) * 1.4); animation-delay: -16s; }
        `}</style>
    </div>
  );
};

export default FleetVisualizer;