'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/profile1.jpg',
  '/profile2.jpg'
];

export default function AnimatedLogo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Start the animation immediately
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 2000); // Reduced to 2 seconds for more dynamic switching

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-10 w-24 flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
          }}
          className="absolute inset-0 flex gap-2"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={images[currentIndex]}
              alt="Profile"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={images[currentIndex === 0 ? 1 : 0]}
              alt="Profile"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 