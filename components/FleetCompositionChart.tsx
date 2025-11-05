import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BusData } from '../types';

interface FleetCompositionChartProps {
  fleetData: BusData[];
}

const FleetCompositionChart: React.FC<FleetCompositionChartProps> = ({ fleetData }) => {
  const chartData = [...fleetData].sort((a,b) => b.count - a.count);
  const formatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 });

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg h-96">
      <h3 className="text-lg font-semibold text-white mb-4">Composición de la Flota</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 20, bottom: 40 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis type="number" stroke="#9ca3af" domain={[0, 'dataMax + 500']}/>
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="#9ca3af" 
            width={150} 
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}
            contentStyle={{ 
                backgroundColor: '#1f2937', 
                borderColor: '#4b5563',
                borderRadius: '0.5rem'
            }}
            formatter={(value: number) => [formatter.format(value), "Buses"]}
          />
          <Bar dataKey="count" name="Cantidad" barSize={20} animationDuration={800}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FleetCompositionChart;
