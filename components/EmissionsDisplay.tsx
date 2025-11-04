
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface EmissionsDisplayProps {
  metrics: {
    totalEmissions: number;
    totalBuses: number;
    electricBuses: number;
    nonElectricBuses: number;
  };
}

const StatCard: React.FC<{ title: string; value: string; unit?: string; className?: string }> = ({ title, value, unit, className }) => (
    <div className={`bg-gray-800 p-4 rounded-lg text-center ${className}`}>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {unit && <p className="text-xs text-gray-500">{unit}</p>}
    </div>
);


const EmissionsDisplay: React.FC<EmissionsDisplayProps> = ({ metrics }) => {
  const { totalEmissions, totalBuses, electricBuses, nonElectricBuses } = metrics;
  const formatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 });
  
  const pieData = [
    { name: 'Eléctricos', value: electricBuses, color: '#22c55e' },
    { name: 'No Eléctricos', value: nonElectricBuses, color: '#6b7280' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2 bg-gray-800/50 p-6 rounded-2xl text-center border border-gray-700 shadow-lg">
              <p className="text-lg text-green-400">Huella de Carbono Total</p>
              <p className="text-5xl font-extrabold text-white my-2">
                {formatter.format(totalEmissions)}
              </p>
              <p className="text-md text-gray-400">toneladas de CO₂ por año</p>
          </div>
          <StatCard title="Buses Totales" value={formatter.format(totalBuses)} />
          <StatCard title="Buses Eléctricos" value={formatter.format(electricBuses)} />
      </div>

      <div className="bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-700 shadow-lg min-h-[250px]">
        <h3 className="text-lg font-semibold text-center mb-2">Proporción de la Flota</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Pie>
            <Tooltip
                contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#4b5563',
                    borderRadius: '0.5rem'
                }}
                formatter={(value: number) => [formatter.format(value), "Buses"]}
            />
            <Legend iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionsDisplay;
