'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const categories = ["All", "Mobile", "Desktop", "Web"];

const projects = [
  {
    title: "English Level Assessment App",
    description: "A desktop application built with Flutter and Firebase that helps students assess and track their English proficiency level. Features include assessment tests, progress tracking, and personalized learning paths.",
    image: "/images/desktop_app.png",
    category: "Desktop",
    technologies: ["Flutter", "Firebase", "Desktop", "Education"],
    features: [
      "Interactive English assessment tests",
      "Real-time progress tracking",
      "Personalized learning recommendations",
      "Comprehensive performance analytics"
    ]
  },
  {
    title: "Business Management Suite",
    description: "A comprehensive mobile application for business owners to manage their companies, projects, and CEOs. Essential tool for business operations with features for project tracking, team management, and performance analytics.",
    image: "/images/mobile_app.png",
    category: "Mobile",
    technologies: ["Mobile", "Business", "Management", "Analytics"],
    features: [
      "Project and task management",
      "Team collaboration tools",
      "Performance dashboards",
      "Resource allocation"
    ]
  },
  {
    title: "Morjib Delivery Platform",
    description: "An all-in-one ecommerce and delivery platform similar to Glovo. Connects customers with local businesses for food, groceries, and other deliveries with real-time tracking and seamless payment integration.",
    image: "/images/morjib.png",
    category: "Mobile",
    technologies: ["E-commerce", "Delivery", "Mobile", "Real-time"],
    features: [
      "Real-time order tracking",
      "Secure payment processing",
      "Vendor management system",
      "Customer rating system"
    ]
  }
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = projects.filter(project => 
    selectedCategory === "All" ? true : project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f0] to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-[#1a1a1a] mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of innovative solutions across desktop, mobile, and web platforms. 
            Each project represents our commitment to excellence and user-centered design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-white text-[#1a1a1a] hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="space-y-20">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#faf5f0] rounded-md overflow-hidden border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-colors duration-300"
            >
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[#1a1a1a] text-sm font-medium">
                        {project.category}
                      </span>
                      <span className="text-[#1a1a1a]/60 text-sm">
                        {project.technologies.join(" • ")}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#1a1a1a]/80 transition-colors duration-300 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-[#1a1a1a]/70">{project.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-[#1a1a1a] mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center text-[#1a1a1a]/70">
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">Have a Project in Mind?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always excited to take on new challenges and create innovative solutions. 
            Let's discuss how we can help bring your ideas to life.
          </p>
          <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#333] transition-colors duration-300">
            Start a Project
          </button>
        </motion.div>
      </div>
    </div>
  );
} 