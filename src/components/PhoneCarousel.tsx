'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, PanInfo, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PhoneFrame from './PhoneFrame';
import LaptopFrame from './LaptopFrame';
import { Archivo_Black } from 'next/font/google';

const archivo = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
});

const phoneFrames = [
  { id: 1, appType: 'marketplace' as const },
  { id: 2, appType: 'vpn' as const },
  { id: 3, appType: 'laptop' as const },
  { id: 4, appType: 'createapp' as const },
];

interface DeviceDisplayProps {
  onAppTypeChange?: (appType: 'marketplace' | 'vpn' | 'laptop' | 'createapp') => void;
}

export default function DeviceDisplay({ onAppTypeChange }: DeviceDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetCounter, setResetCounter] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const frame1Controls = useAnimation();
  const frame2Controls = useAnimation();
  const frame3Controls = useAnimation();
  const frame4Controls = useAnimation();
  
  const animationControlsRef = useRef([frame1Controls, frame2Controls, frame3Controls, frame4Controls]);

  useEffect(() => {
    if (resetCounter > 0) {
      animationControlsRef.current.forEach(control => control.set({ x: 0, opacity: 1 }));
    }
  }, [resetCounter]);

  useEffect(() => {
    onAppTypeChange?.(phoneFrames[currentIndex].appType);
  }, [currentIndex, onAppTypeChange]);

  const swiped = (direction: 'left' | 'right', index: number) => {
    if (index === phoneFrames.length - 1) {
      setTimeout(() => {
        setCurrentIndex(0);
        setResetCounter((prev) => prev + 1);
      }, 250);
    } else {
      setCurrentIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? phoneFrames.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onAppTypeChange?.(phoneFrames[newIndex].appType);
  };

  const handleNext = () => {
    if (currentIndex === phoneFrames.length - 1) {
      setCurrentIndex(0);
      setResetCounter((prev) => prev + 1);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    onAppTypeChange?.(phoneFrames[currentIndex === phoneFrames.length - 1 ? 0 : currentIndex + 1].appType);
  };

  return (
    <div className={`relative ${phoneFrames[currentIndex].appType === 'laptop' ? 'w-[600px]' : 'w-[300px]'} h-[600px] mx-auto transition-all duration-300`}>
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
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            {phoneFrames[currentIndex].appType === 'laptop' ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="transform scale-100">
                  <LaptopFrame>
                    <div className="h-full w-full flex flex-col relative">
                      {/* Windows XP Background */}
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/images/windowsxp_walp.jpg")' }} />

                      {/* Window */}
                      <motion.div 
                        className="absolute inset-4 bg-white rounded-lg overflow-hidden shadow-xl flex flex-col"
                        drag
                        dragMomentum={false}
                        dragConstraints={{
                          top: 0,
                          left: 0,
                          right: 100,
                          bottom: 100
                        }}
                        dragElastic={0}
                        animate={isMinimized ? {
                          y: "150%",
                          x: "-50%",
                          scale: 0.1,
                          opacity: 0
                        } : {
                          y: 0,
                          x: 0,
                          scale: 1,
                          opacity: 1
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Window Title Bar */}
                        <div className="h-7 bg-gradient-to-r from-[#0054E3] via-[#0054E3] to-[#0054E3] flex items-center justify-between px-2 cursor-move">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFF">
                              <path d="M4 4h16v16H4V4z" />
                            </svg>
                            <span className="text-white text-sm">ThisPC</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => setIsMinimized(true)}
                              className="w-5 h-5 flex items-center justify-center hover:bg-[#3C80EE]"
                            >
                              <span className="text-white text-lg leading-none mb-1">_</span>
                            </button>
                            <button className="w-5 h-5 flex items-center justify-center hover:bg-[#3C80EE]">
                              <span className="text-white text-lg leading-none">□</span>
                            </button>
                            <button className="w-5 h-5 flex items-center justify-center hover:bg-[#3C80EE]">
                              <span className="text-white text-lg leading-none">×</span>
                            </button>
                          </div>
                        </div>

                        {/* Menu Bar */}
                        <div className="h-6 bg-[#F1F1F1] flex items-center px-2 text-xs border-b border-[#ccc]">
                          <span className="px-1 hover:bg-[#E5F3FF] cursor-pointer">File</span>
                          <span className="px-1 hover:bg-[#E5F3FF] cursor-pointer">Home</span>
                          <span className="px-1 hover:bg-[#E5F3FF] cursor-pointer">Share</span>
                          <span className="px-1 hover:bg-[#E5F3FF] cursor-pointer">View</span>
                        </div>

                        {/* Toolbar */}
                        <div className="h-10 bg-[#F5F6F7] flex items-center px-2 gap-2 border-b border-[#ccc]">
                          <button className="h-7 px-2 flex items-center gap-1 hover:bg-[#E5F3FF] rounded">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button className="h-7 px-2 flex items-center gap-1 hover:bg-[#E5F3FF] rounded">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex">
                          {/* Sidebar */}
                          <div className="w-48 bg-[#EFF3F8] p-2 border-r border-[#ccc]">
                            <div className="text-sm font-semibold mb-2">Quick Access</div>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#E5F3FF] cursor-pointer">
                                <svg className="w-4 h-4 text-[#0054E3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-sm">Home</span>
                              </div>
                              <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#E5F3FF] cursor-pointer">
                                <svg className="w-4 h-4 text-[#0054E3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <span className="text-sm">Documents</span>
                              </div>
                              <div className="flex items-center gap-2 px-2 py-1 hover:bg-[#E5F3FF] cursor-pointer">
                                <svg className="w-4 h-4 text-[#0054E3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">Pictures</span>
                              </div>
                            </div>
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 bg-white p-2">
                            <div className="flex items-start">
                              <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-12 h-12 flex items-center justify-center">
                                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                                    {/* Windows XP style app icon */}
                                    <rect x="4" y="4" width="40" height="40" rx="4" fill="#1B87E6"/>
                                    <rect x="6" y="6" width="36" height="36" rx="3" fill="#30A4FF"/>
                                    <path d="M16 24H32M24 16V32" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                                  </svg>
                                </div>
                                <span className="text-xs group-hover:bg-[#E5F3FF] px-1">Click Me</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Taskbar */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-[#1f50ba] to-[#2b68df] flex items-center px-1 border-t border-[#3373e0]">
                        <button className="h-[26px] px-2 flex items-center gap-1 bg-gradient-to-b from-[#3884e6] to-[#2d69e0] hover:from-[#3373e0] hover:to-[#1f50ba] rounded border border-[#3373e0] mr-2">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4h7v7H4V4z" fill="#4CAF50"/>
                            <path d="M13 4h7v7h-7V4z" fill="#F44336"/>
                            <path d="M4 13h7v7H4v-7z" fill="#2196F3"/>
                            <path d="M13 13h7v7h-7v-7z" fill="#FFC107"/>
                          </svg>
                          <span className="text-white text-sm font-semibold">Start</span>
                        </button>

                        {/* Window Button in Taskbar */}
                        {isMinimized && (
                          <button
                            onClick={() => setIsMinimized(false)}
                            className="h-[26px] px-2 flex items-center gap-1 bg-gradient-to-b from-[#3884e6] to-[#2d69e0] hover:from-[#3373e0] hover:to-[#1f50ba] rounded border border-[#3373e0]"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFF">
                              <path d="M4 4h16v16H4V4z" />
                            </svg>
                            <span className="text-white text-sm">ThisPC</span>
                          </button>
                        )}

                        {/* System Tray */}
                        <div className="ml-auto flex items-center gap-2 pl-2">
                          <span className="text-white text-xs">10:12 AM</span>
                        </div>
                      </div>
                    </div>
                  </LaptopFrame>
                </div>
              </div>
            ) : (
              <PhoneFrame appType={phoneFrames[currentIndex].appType}>
                {phoneFrames[currentIndex].appType === 'createapp' && (
                  <div className="h-full w-full flex flex-col items-center justify-center bg-[#fcf5eb] p-6">
                    <div className="mb-8 text-center">
                      <h2 className={`${archivo.className} text-2xl text-gray-900 mb-3`}>CREATE YOUR APP</h2>
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-8 h-[2px] bg-gray-900" />
                        <p className="text-gray-600 text-sm uppercase tracking-wider">Start Building</p>
                        <div className="w-8 h-[2px] bg-gray-900" />
                      </div>
                    </div>
                    
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
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}