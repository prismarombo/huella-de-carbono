
import React, { useState, useMemo, useCallback } from 'react';
import { BusData } from './types';
import { HE, HN, INITIAL_FLEET_DATA } from './constants';
import BusSlider from './components/BusSlider';
import EmissionsDisplay from './components/EmissionsDisplay';
import FleetCompositionChart from './components/FleetCompositionChart';

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
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Simulador de Huella de Carbono
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Ajusta la composición de la flota de autobuses y observa el impacto en las emisiones de CO₂.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800/50 p-6 rounded-2xl shadow-lg border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Configuración de la Flota</h2>
                <button 
                  onClick={resetFleet}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
                >
                  Reiniciar
                </button>
            </div>
            <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
              {fleet.map(bus => (
                <BusSlider
                  key={bus.id}
                  busData={bus}
                  onChange={handleBusCountChange}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <EmissionsDisplay metrics={fleetMetrics} />
            <FleetCompositionChart fleetData={fleet} />
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
