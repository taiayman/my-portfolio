'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: "English Level Assessment App",
    description: "A desktop application built with Flutter and Firebase that helps students assess and track their English proficiency level. Features include assessment tests, progress tracking, and personalized learning paths.",
    image: "/images/desktop_app.png",
    tags: ["Flutter", "Firebase", "Desktop", "Education"]
  },
  {
    title: "Business Management Suite",
    description: "A comprehensive mobile application for business owners to manage their companies, projects, and CEOs. Essential tool for business operations with features for project tracking, team management, and performance analytics.",
    image: "/images/mobile_app.png",
    tags: ["Mobile", "Business", "Management", "Analytics"]
  },
  {
    title: "Morjib Delivery Platform",
    description: "An all-in-one ecommerce and delivery platform similar to Glovo. Connects customers with local businesses for food, groceries, and other deliveries with real-time tracking and seamless payment integration.",
    image: "/images/morjib.png",
    tags: ["E-commerce", "Delivery", "Mobile", "Real-time"]
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">Our Portfolio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out our featured projects showcasing our expertise in desktop, mobile, and web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#faf5f0] border border-[#1a1a1a] rounded-xl overflow-hidden"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#1a1a1a] text-[#faf5f0] px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 