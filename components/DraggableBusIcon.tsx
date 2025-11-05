import React from 'react';
import { BusData } from '../types';

const BusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M56 18H8C5.79 18 4 19.79 4 22V48C4 50.21 5.79 52 8 52H11C11.55 52 12 52.45 12 53C12 54.66 13.34 56 15 56C16.66 56 18 54.66 18 53C18 52.45 18.45 52 19 52H45C45.55 52 46 52.45 46 53C46 54.66 47.34 56 49 56C50.66 56 52 54.66 52 53C52 52.45 52.45 52 53 52H56C58.21 52 60 50.21 60 48V22C60 19.79 58.21 18 56 18ZM8 28V22H56V28H8ZM6 32H58V44H6V32Z" fill="currentColor"/>
  </svg>
);


interface DraggableBusIconProps {
  busData: BusData;
}

const DraggableBusIcon: React.FC<DraggableBusIconProps> = ({ busData }) => {
  const { id, name, isElectric, color } = busData;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('busId', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="p-2 rounded-lg bg-gray-700/50 border border-gray-600 flex flex-col items-center text-center cursor-move transition-all duration-200 hover:bg-gray-700 hover:scale-105 active:cursor-grabbing"
      title={`Arrastrar ${name}`}
    >
      <div className="relative">
        <BusIcon className="w-12 h-12" style={{ color }} />
        {isElectric && (
          <div className="absolute -top-1 -right-1 bg-gray-800 rounded-full p-0.5 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-xs mt-1 font-medium text-gray-300 truncate w-full">{name}</p>
    </div>
  );
};

export default DraggableBusIcon;
