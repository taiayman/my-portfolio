'use client';

import Image from 'next/image'
import { Project } from '@/types'
import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, image, tags, link }: Project) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="aspect-video relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          whileHover={{ x: 5 }}
        >
          View Project →
        </motion.a>
      </div>
    </motion.div>
  )
} 