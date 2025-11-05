import React, { useState, useMemo, useCallback } from 'react';
import { BusData } from './types';
import { HE, HN, INITIAL_FLEET_DATA } from './constants';
import BusSlider from './components/BusSlider';
import EmissionsDisplay from './components/EmissionsDisplay';
import FleetCompositionChart from './components/FleetCompositionChart';
import FleetVisualizer from './components/CitySimulator'; // Renamed for clarity in implementation, file name is the same

const BusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M56 18H8C5.79 18 4 19.79 4 22V48C4 50.21 5.79 52 8 52H11C11.55 52 12 52.45 12 53C12 54.66 13.34 56 15 56C16.66 56 18 54.66 18 53C18 52.45 18.45 52 19 52H45C45.55 52 46 52.45 46 53C46 54.66 47.34 56 49 56C50.66 56 52 54.66 52 53C52 52.45 52.45 52 53 52H56C58.21 52 60 50.21 60 48V22C60 19.79 58.21 18 56 18ZM8 28V22H56V28H8ZM6 32H58V44H6V32Z" fill="currentColor"/>
  </svg>
);

const App: React.FC = () => {
  const [fleet, setFleet] = useState<BusData[]>(INITIAL_FLEET_DATA);

  const fleetMetrics = useMemo(() => {
    const totalBuses = fleet.reduce((sum, bus) => sum + bus.count, 0);
    const electricBuses = fleet
      .filter(bus => bus.isElectric)
      .reduce((sum, bus) => sum + bus.count, 0);
    const nonElectricBuses = totalBuses - electricBuses;
    const totalEmissions = electricBuses * HE + nonElectricBuses * HN;

    return {
      totalBuses,
      electricBuses,
      nonElectricBuses,
      totalEmissions,
    };
  }, [fleet]);

  const handleBusCountChange = useCallback((id: string, newCount: number) => {
    setFleet(currentFleet =>
      currentFleet.map(bus =>
        bus.id === id ? { ...bus, count: Math.max(0, newCount) } : bus
      )
    );
  }, []);
  
  const resetFleet = () => {
    setFleet(INITIAL_FLEET_DATA);
  };

  return (
    <div className="min-h-screen text-gray-200 p-4 sm:p-6 lg:p-8 animated-gradient">
      <div className="max-w-screen-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
              <BusIcon className="w-14 h-14 sm:w-16 sm:h-16 text-green-400 transform -scale-x-100" />
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Simulador de Huella de Carbono
              </h1>
          </div>
          <p className="mt-2 text-lg text-gray-400">
            Ajusta la composición de la flota para ver el impacto en las emisiones de CO₂.
          </p>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-white">Configuración de la Flota</h2>
                    <button 
                      onClick={resetFleet}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
                    >
                      Reiniciar Flota
                    </button>
                </div>
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
                  {fleet.map(bus => (
                    <BusSlider
                      key={bus.id}
                      busData={bus}
                      onChange={handleBusCountChange}
                    />
                  ))}
                </div>
            </div>

            <EmissionsDisplay metrics={fleetMetrics} />
            <FleetCompositionChart fleetData={fleet} />
          </div>

          <div className="xl:col-span-1">
            <FleetVisualizer fleetData={fleet} totalEmissions={fleetMetrics.totalEmissions} />
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Ecuación: H<sub>total</sub> = E &times; H<sub>e</sub> + (T - E) &times; H<sub>n</sub></p>
            <p>H<sub>e</sub> = {HE} ton CO₂/bus/año | H<sub>n</sub> = {HN} ton CO₂/bus/año</p>
        </footer>
      </div>
    </div>
  );
};

export default App;