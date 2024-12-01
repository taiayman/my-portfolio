'use client';

import { Service } from '@/types'
import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, icon }: Service) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card p-6 rounded-lg bg-white shadow-sm"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
} 