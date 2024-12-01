'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import PhoneFrame from './PhoneFrame';
import CreateAppScreen from './CreateAppScreen';

const phoneFrames = [
  { id: 1, appType: 'marketplace' as const },
  { id: 2, appType: 'vpn' as const },
  { id: 3, appType: 'createapp' as const },
  // Add more cards as needed
];

interface DeviceDisplayProps {
  onAppTypeChange?: (appType: 'marketplace' | 'vpn' | 'createapp') => void;
}

import { Archivo_Black } from 'next/font/google';

const archivo = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
});

export default function DeviceDisplay({ onAppTypeChange }: DeviceDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(phoneFrames.length - 1);
  const [resetCounter, setResetCounter] = useState(0);
  
  // Create individual animation controls for each frame
  const frame1Controls = useAnimation();
  const frame2Controls = useAnimation();
  const frame3Controls = useAnimation();
  
  const animationControlsRef = useRef([frame1Controls, frame2Controls, frame3Controls]);

  useEffect(() => {
    // Reset animation controls if needed
    if (resetCounter > 0) {
      animationControlsRef.current.forEach(control => control.set({ x: 0, opacity: 1 }));
    }
  }, [resetCounter]);

  useEffect(() => {
    return () => {
      // Cleanup if necessary
    };
  }, [currentIndex]);

  useEffect(() => {
    // Notify parent of app type change
    onAppTypeChange?.(phoneFrames[currentIndex].appType);
  }, [currentIndex, onAppTypeChange]);

  const swiped = (direction: 'left' | 'right', index: number) => {
    if (index === 0) {
      // Reset the deck when the last card is swiped
      setTimeout(() => {
        setCurrentIndex(phoneFrames.length - 1);
        setResetCounter((prev) => prev + 1);
      }, 250);
    } else {
      setCurrentIndex(index - 1);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === phoneFrames.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onAppTypeChange?.(phoneFrames[newIndex].appType);
  };

  const handleNext = () => {
    if (currentIndex === 0) {
      setCurrentIndex(phoneFrames.length - 1);
      setResetCounter((prev) => prev + 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    onAppTypeChange?.(phoneFrames[currentIndex === 0 ? phoneFrames.length - 1 : currentIndex - 1].appType);
  };

  const phoneFramesReversed = [...phoneFrames].reverse();

  return (
    <div className="relative w-[300px] h-[600px] mx-auto">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-2 transition-all"
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-800 rounded-full p-2 transition-all"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <div className="absolute inset-0">
        {phoneFramesReversed.map((phone, i) => {
          const index = phoneFrames.length - 1 - i;
          const isCurrent = index === currentIndex;

          const controls = animationControlsRef.current[index];

          // Only render cards that haven't been swiped yet
          if (index > currentIndex) {
            return null;
          }

          return (
            <motion.div
              key={`${phone.id}-${resetCounter}`}
              className="absolute w-full h-full"
              style={{
                zIndex: index,
                pointerEvents: isCurrent ? 'auto' : 'none',
              }}
              initial={{ scale: 0.95, y: 20 }}
              animate={controls}
              transition={{ duration: 0.3 }}
              drag={isCurrent ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={(event, info: PanInfo) => {
                if (info.offset.x < -100) {
                  // Swiped left
                  controls
                    .start({
                      x: -window.innerWidth,
                      rotate: -15,
                      transition: { duration: 0.5 },
                    })
                    .then(() => {
                      swiped('left', index);
                      controls.set({ x: 0, rotate: 0 });
                    });
                } else if (info.offset.x > 100) {
                  // Swiped right
                  controls
                    .start({
                      x: window.innerWidth,
                      rotate: 15,
                      transition: { duration: 0.5 },
                    })
                    .then(() => {
                      swiped('right', index);
                      controls.set({ x: 0, rotate: 0 });
                    });
                } else {
                  // If swipe threshold not met, card snaps back automatically
                  controls.start({ x: 0, rotate: 0 });
                }
              }}
            >
              <PhoneFrame appType={phone.appType}>
                {phone.appType === 'createapp' && (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-[#fcf5eb] p-6">
                    <div className="mb-8 text-center">
                      <h2 className={`${archivo.className} text-2xl text-gray-900 mb-3`}>CREATE YOUR APP</h2>
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-8 h-[2px] bg-gray-900" />
                        <p className="text-gray-600 text-sm uppercase tracking-wider">Start Building</p>
                        <div className="w-8 h-[2px] bg-gray-900" />
                      </div>
                    </div>
                    
                    {/* Icon Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8 w-full max-w-xs">
                      <div className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
                        <svg className="w-8 h-8 text-[#E31837] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">Mobile</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
                        <svg className="w-8 h-8 text-[#E31837] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">Web</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
                        <svg className="w-8 h-8 text-[#E31837] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">Desktop</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100">
                        <svg className="w-8 h-8 text-[#E31837] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xs font-medium text-gray-900 uppercase tracking-wide">Fast</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => window.open('https://wa.me/212765755723', '_blank')}
                      className="group relative px-8 py-4 bg-[#E31837] text-white rounded-xl hover:bg-[#c41530] transition-all duration-300 shadow-lg text-lg uppercase tracking-wider font-medium overflow-hidden"
                    >
                      <span className="relative z-10">Start Creating</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E31837] to-[#c41530] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </button>
                  </div>
                )}
              </PhoneFrame>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
