import React from 'react';
import { BusData } from '../types';

const BusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M56 18H8C5.79 18 4 19.79 4 22V48C4 50.21 5.79 52 8 52H11C11.55 52 12 52.45 12 53C12 54.66 13.34 56 15 56C16.66 56 18 54.66 18 53C18 52.45 18.45 52 19 52H45C45.55 52 46 52.45 46 53C46 54.66 47.34 56 49 56C50.66 56 52 54.66 52 53C52 52.45 52.45 52 53 52H56C58.21 52 60 50.21 60 48V22C60 19.79 58.21 18 56 18ZM8 28V22H56V28H8ZM6 32H58V44H6V32Z" fill="currentColor"/>
  </svg>
);


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
    <div className="p-4 rounded-lg bg-gray-700/50 border border-gray-600 transition-all duration-300 hover:bg-gray-700 hover:border-gray-500 hover:scale-[1.03]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <BusIcon className="w-10 h-10" style={{ color }} />
            {isElectric && (
              <div className="absolute -top-1.5 -right-1.5 bg-gray-800 rounded-full p-0.5 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <label htmlFor={id} className="font-medium text-gray-300">{name}</label>
        </div>
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
            transition: transform 0.2s ease-in-out;
        }
        input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: var(--range-color);
            cursor: pointer;
            border-radius: 50%;
            border: 2px solid #1f2937;
            transition: transform 0.2s ease-in-out;
        }
        input[type="range"]:hover::-webkit-slider-thumb {
            transform: scale(1.2);
        }
        input[type="range"]:hover::-moz-range-thumb {
            transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default BusSlider;
