import React from 'react';
import { motion } from 'framer-motion';

export default function LaptopAppContent() {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-white p-2 font-mono text-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-2 text-xs">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex space-x-2 text-gray-400">
          <span>index.tsx</span>
          <span>style.css</span>
          <span>app.tsx</span>
        </div>
      </div>

      {/* Code Editor Content */}
      <div className="space-y-1 text-[10px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex"
        >
          <span className="text-gray-500 w-4">1</span>
          <span className="text-[#c678dd] ml-2">import</span>
          <span className="text-white ml-1">{'{'}</span>
          <span className="text-[#e5c07b] ml-1">useState</span>
          <span className="text-white ml-1">{'}'}</span>
          <span className="text-[#c678dd] ml-1">from</span>
          <span className="text-[#98c379] ml-1">'react'</span>
          <span className="text-white">;</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex"
        >
          <span className="text-gray-500 w-4">2</span>
          <span className="text-[#c678dd] ml-2">function</span>
          <span className="text-[#61afef] ml-1">App</span>
          <span className="text-white">() {'{}'}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex"
        >
          <span className="text-gray-500 w-4">3</span>
          <span className="text-[#c678dd] ml-2">const</span>
          <span className="text-[#e06c75] ml-1">[count, setCount]</span>
          <span className="text-white ml-1">=</span>
          <span className="text-[#61afef] ml-1">useState</span>
          <span className="text-white">(</span>
          <span className="text-[#d19a66]">0</span>
          <span className="text-white">);</span>
        </motion.div>

        {/* Blinking Cursor */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute w-[2px] h-[12px] bg-white ml-6 mt-1"
        />
      </div>
    </div>
  );
} 