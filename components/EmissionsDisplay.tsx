import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const AnimatedNumber: React.FC<{ value: number; formatter: Intl.NumberFormat }> = ({ value, formatter }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    if (startValue === endValue) return;

    const duration = 750; // ms
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const currentVal = startValue + (endValue - startValue) * easedProgress;
      setDisplayValue(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
        prevValueRef.current = endValue;
      }
    };

    const frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      prevValueRef.current = value;
    };
  }, [value]);

  return <span>{formatter.format(displayValue)}</span>;
};

const BusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" {...props}>
     <path fillRule="evenodd" clipRule="evenodd" d="M56 18H8C5.79 18 4 19.79 4 22V48C4 50.21 5.79 52 8 52H11C11.55 52 12 52.45 12 53C12 54.66 13.34 56 15 56C16.66 56 18 54.66 18 53C18 52.45 18.45 52 19 52H45C45.55 52 46 52.45 46 53C46 54.66 47.34 56 49 56C50.66 56 52 54.66 52 53C52 52.45 52.45 52 53 52H56C58.21 52 60 50.21 60 48V22C60 19.79 58.21 18 56 18ZM8 28V22H56V28H8ZM6 32H58V44H6V32Z" fill="currentColor"/>
  </svg>
);

const StatCard: React.FC<{ title: string; value: React.ReactNode; unit?: string; icon?: React.ReactNode; className?: string }> = ({ title, value, unit, icon, className }) => (
    <div className={`bg-gray-800 p-4 rounded-lg text-center flex flex-col items-center justify-center ${className}`}>
        <div className="flex items-center gap-2 mb-1">
            {icon}
            <p className="text-sm text-gray-400">{title}</p>
        </div>
        <p className="text-3xl font-bold text-white">{value}</p>
        {unit && <p className="text-xs text-gray-500">{unit}</p>}
    </div>
);


interface EmissionsDisplayProps {
  metrics: {
    totalEmissions: number;
    totalBuses: number;
    electricBuses: number;
    nonElectricBuses: number;
  };
}

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
                <AnimatedNumber value={totalEmissions} formatter={formatter} />
              </p>
              <p className="text-md text-gray-400">toneladas de CO₂ por año</p>
          </div>
          <StatCard 
            title="Buses Totales" 
            value={<AnimatedNumber value={totalBuses} formatter={formatter} />} 
            icon={<BusIcon className="w-5 h-5 text-gray-400" />}
          />
          <StatCard 
            title="Buses Eléctricos" 
            value={<AnimatedNumber value={electricBuses} formatter={formatter} />} 
            icon={
              <div className="relative">
                <BusIcon className="w-5 h-5 text-green-400" />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
            }
          />
      </div>

      <div className="bg-gray-800/50 p-4 rounded-2xl flex flex-col items-center justify-center border border-gray-700 shadow-lg min-h-[250px]">
        <h3 className="text-lg font-semibold text-center mb-2">Proporción de la Flota</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" isAnimationActive={true}>
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
