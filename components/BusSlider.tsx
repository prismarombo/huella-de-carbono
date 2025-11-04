
import React from 'react';
import { BusData } from '../types';

interface BusSliderProps {
  busData: BusData;
  onChange: (id: string, newCount: number) => void;
}

const BusSlider: React.FC<BusSliderProps> = ({ busData, onChange }) => {
  const { id, name, count, isElectric, color } = busData;
  const maxSliderValue = Math.max(2000, count * 2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, parseInt(e.target.value, 10) || 0);
  };

  return (
    <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={id} className="font-medium text-gray-300 flex items-center">
          {isElectric && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          )}
          {name}
        </label>
        <input
          type="number"
          id={`${id}-number`}
          value={count}
          onChange={handleInputChange}
          className="w-24 bg-gray-800 text-white text-right font-semibold rounded-md border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          min="0"
        />
      </div>
      <input
        type="range"
        id={id}
        min="0"
        max={maxSliderValue}
        value={count}
        onChange={handleInputChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          '--range-color': color,
          background: `linear-gradient(to right, ${color} 0%, ${color} ${count / maxSliderValue * 100}%, #4b5563 ${count / maxSliderValue * 100}%, #4b5563 100%)`
        } as React.CSSProperties}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: var(--range-color);
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid #1f2937;
        }
        input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: var(--range-color);
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid #1f2937;
        }
      `}</style>
    </div>
  );
};

export default BusSlider;
