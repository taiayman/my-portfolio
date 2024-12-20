import React from 'react';

interface LaptopFrameProps {
  children: React.ReactNode;
}

export default function LaptopFrame({ children }: LaptopFrameProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Laptop Body */}
      <div className="relative w-[480px] transform scale-100">
        {/* Screen */}
        <div className="relative bg-gray-800 rounded-t-xl pt-[2px] px-[2px]">
          <div className="absolute top-[8px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full">
            <div className="absolute w-1.5 h-1.5 bg-gray-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="bg-black rounded-lg overflow-hidden">
            {/* Screen Content */}
            <div className="relative bg-white w-full pt-[62.5%]">
              <div className="absolute inset-0">
                {children}
              </div>
            </div>
          </div>
        </div>
        
        {/* Base */}
        <div className="relative bg-gray-800 h-4 rounded-b-lg">
          {/* Hinge */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-[2px] w-32 h-1.5 bg-gray-700 rounded-full" />
          {/* Touchpad Area */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[2px] w-28 h-2.5 bg-gray-700 rounded-b-lg" />
        </div>
        
        {/* Reflection */}
        <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-t-xl" />
        </div>
      </div>
    </div>
  );
} 