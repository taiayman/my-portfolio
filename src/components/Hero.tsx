'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import * as Flags from 'country-flag-icons/react/3x2';
import PhoneFrame from './PhoneFrame';
import { Archivo_Black } from 'next/font/google';
import AIChatOverlay from './AIChatOverlay';
import PhoneCarousel from './PhoneCarousel';
import QuestionOverlay from './QuestionOverlay';
import '../styles/flags.css';

const archivo = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
});

const estimateTexts = [
  "Chhal khas nkhlss?", // Darija
  "Combien ça coûte?", // French
  "Get Project Estimate", // English
  "bCh7al had l'khedma?", // Darija
  "Quel est le prix?", // French
  "Calculate Price", // English
  "3tini taman?", // Darija
  "Prix du projet?", // French
  "Project Cost", // English
];

export default function Hero() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentAppType, setCurrentAppType] = useState<'marketplace' | 'vpn' | 'laptop' | 'createapp'>('marketplace');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguages(false);
    setIsChatOpen(true);
  };

  const questions = [
    "How much do you charge?",
    "Combien facturez-vous?",
    "Bch7al kankhedmo?",
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentPhrase = estimateTexts[currentTextIndex];

    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % estimateTexts.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      }
    } else {
      if (displayText === currentPhrase) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const openWhatsApp = () => {
    window.open('https://wa.me/212765755723', '_blank');
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AIChatOverlay
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedLanguage={selectedLanguage}
      />

      <section className="min-h-screen pt-16 md:pt-24 pb-24 md:pb-32 bg-[#fcf5eb] relative overflow-hidden">
        {/* Language Selection Overlay */}
        <AnimatePresence>
          {showLanguages && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
              onClick={() => setShowLanguages(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-3 md:p-8 p-4 w-full md:max-w-[600px] max-w-[180px] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                {[
                  { name: 'English', code: 'GB', Flag: Flags.GB },
                  { name: 'French', code: 'FR', Flag: Flags.FR },
                  { name: 'Darija', code: 'MA', Flag: Flags.MA },
                ].map((lang, idx) => (
                  <motion.button
                    key={lang.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => handleLanguageSelect(lang.name)}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden hover:ring-4 hover:ring-gray-200 transition-all relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 w-[150%] h-[150%] -translate-x-[16.67%] -translate-y-[16.67%]">
                      <lang.Flag className="w-full h-full object-cover" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vertical GET PROPOSAL text */}
        <div className="hidden md:block absolute top-24 right-8 transform -rotate-90 origin-right">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-gray-900" />
            <span className="text-gray-900 tracking-widest text-sm font-bold uppercase">
              Get Proposal
            </span>
          </div>
        </div>

        {/* Mobile GET PROPOSAL text */}
        <div className="block md:hidden absolute top-6 right-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 tracking-widest text-xs font-bold uppercase">
              Get Proposal
            </span>
            <div className="w-4 h-[2px] bg-gray-900" />
          </div>
        </div>

        {/* Vertical KNOW US text - Desktop Only */}
        <motion.div 
          className="hidden md:block absolute bottom-24 left-8 transform rotate-90 origin-left cursor-pointer"
          onClick={scrollToAbout}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-3 group">
            <span className="text-gray-900 tracking-widest text-sm font-bold uppercase group-hover:text-primary transition-colors">
              Know Us
            </span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-gray-900 group-hover:bg-primary transition-colors" />
              <motion.svg 
                className="w-3 h-3 text-gray-900 fill-current group-hover:text-primary transition-colors"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
              </motion.svg>
            </div>
          </div>
        </motion.div>

        {/* Background Dots Pattern */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #E5E7EB 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              opacity: '0.1',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`max-w-xl mx-auto md:mx-0 ${currentAppType !== 'laptop' ? 'md:pl-16' : ''} text-center md:text-left order-1 md:order-1 pt-6 sm:pt-8 md:pt-0 ${
                currentAppType === 'laptop' ? 'md:col-span-1' : 'md:col-span-1'
              }`}
            >
              <h1
                className={`${archivo.className} text-[3.5rem] sm:text-[4rem] md:text-[8.5rem] leading-[1.1] md:leading-[0.9] font-bold text-gray-900 mb-4 md:mb-8 tracking-tight`}
              >
                BUILD
                <br className="hidden md:block" /> YOUR
                <br className="hidden md:block" /> DREAM
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-10 leading-relaxed max-w-md mx-auto md:mx-0">
                Mobile app development, design and consulting company for those who want to be
                successful
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openWhatsApp}
                  className="w-full sm:w-[200px] bg-[#1a1a1a] text-white px-6 py-3 md:py-4 rounded-xl md:rounded-none font-medium transition-all text-lg relative overflow-hidden flex items-center justify-center"
                >
                  Contact Us
                </motion.button>
                <button
                  onClick={() => setIsQuestionOpen(true)}
                  className="w-full sm:w-[340px] h-[48px] md:h-[56px] px-6 border border-[#1a1a1a] bg-[#faf5f0] text-[#1a1a1a] rounded-xl md:rounded-none font-medium transition-all text-lg text-center group relative"
                >
                  <span className="absolute inset-0 flex items-center justify-between px-6">
                    <span className="min-w-[240px] text-left whitespace-nowrap overflow-hidden">
                      {displayText}
                      <span className="inline-block w-0.5 h-5 bg-current animate-blink ml-1"></span>
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>

            {/* Phone/Laptop Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`relative flex flex-col items-center order-1 md:order-2 -mx-4 md:mx-0 mt-4 md:mt-0 ${
                currentAppType === 'laptop' ? 'md:-mr-24 lg:-mr-32' : ''
              }`}
            >
              <div className="flex flex-col items-center">
                {/* Phone Carousel with centered GitHub link */}
                <div className={`scale-[0.85] md:scale-100 transform-gpu relative ${
                  currentAppType === 'laptop' ? 'w-[600px]' : 'w-[300px]'
                } h-[600px]`}>
                  <PhoneCarousel onAppTypeChange={setCurrentAppType} />
                  
                  {/* GitHub/Play Store Link - Centered positioning with increased bottom spacing */}
                  <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                    <motion.a
                      href={currentAppType === 'vpn' 
                        ? 'https://play.google.com/store/apps/details?id=com.tindy.vpn' 
                        : 'https://github.com/taiayman/Morjib-app'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-900 hover:text-gray-700 transition-colors group bg-white px-6 py-3 rounded-full hover:bg-gray-50 shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {currentAppType === 'vpn' ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                      <span className="text-base font-medium">
                        {currentAppType === 'vpn' ? 'See the app' : 'See the project'}
                      </span>
                      <svg
                        className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Pattern - Optional */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 4px 4px, #000 2px, transparent 0)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>
      </section>

      <QuestionOverlay isOpen={isQuestionOpen} onClose={() => setIsQuestionOpen(false)} />

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white border-t border-gray-200 px-6 py-2 backdrop-blur-lg bg-white/80">
          <div className="flex justify-between items-center">
            <a href="/services" className="flex flex-col items-center p-2 text-gray-600 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs mt-1">Services</span>
            </a>
            
            <a href="/portfolio" className="flex flex-col items-center p-2 text-gray-600 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-xs mt-1">Portfolio</span>
            </a>
            
            <a href="/about" className="flex flex-col items-center p-2 text-gray-600 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">About</span>
            </a>
            
            <a href="/blog" className="flex flex-col items-center p-2 text-gray-600 hover:text-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H9M9 11l3 3m0 0l3-3m-3 3V8" />
              </svg>
              <span className="text-xs mt-1">Blog</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
