'use client';

import { motion } from 'framer-motion';
import { BiCode, BiMobile, BiLaptop, BiData, BiCloud, BiCog } from 'react-icons/bi';

const services = [
  {
    icon: <BiCode className="w-8 h-8" />,
    title: "Web Development",
    description: "Custom web applications built with modern technologies like React, Next.js, and Node.js. We create responsive, fast, and scalable solutions.",
    features: [
      "Responsive Design",
      "Progressive Web Apps",
      "E-commerce Solutions",
      "API Integration"
    ]
  },
  {
    icon: <BiMobile className="w-8 h-8" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android using Flutter, React Native, and native technologies.",
    features: [
      "Cross-platform Apps",
      "Native iOS/Android",
      "App Store Deployment",
      "Mobile UI/UX Design"
    ]
  },
  {
    icon: <BiLaptop className="w-8 h-8" />,
    title: "Desktop Applications",
    description: "Powerful desktop applications for Windows, macOS, and Linux using Electron, Flutter, and other modern frameworks.",
    features: [
      "Cross-platform Support",
      "Offline Functionality",
      "System Integration",
      "Auto-updates"
    ]
  },
  {
    icon: <BiData className="w-8 h-8" />,
    title: "Database Solutions",
    description: "Database design, optimization, and management services for both SQL and NoSQL databases.",
    features: [
      "Database Design",
      "Performance Optimization",
      "Data Migration",
      "Backup Solutions"
    ]
  },
  {
    icon: <BiCloud className="w-8 h-8" />,
    title: "Cloud Services",
    description: "Cloud infrastructure setup and management using AWS, Google Cloud, and Azure for scalable applications.",
    features: [
      "Cloud Migration",
      "Serverless Architecture",
      "Auto-scaling Setup",
      "Cloud Security"
    ]
  },
  {
    icon: <BiCog className="w-8 h-8" />,
    title: "Maintenance & Support",
    description: "Ongoing maintenance, updates, and technical support for all your software solutions.",
    features: [
      "24/7 Support",
      "Regular Updates",
      "Performance Monitoring",
      "Security Patches"
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#faf5f0]">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 text-[#1a1a1a]">Our Services</h1>
          <p className="text-xl text-[#1a1a1a]/70 max-w-3xl mx-auto">
            We offer comprehensive software solutions tailored to your needs. From web and mobile development 
            to cloud services and maintenance, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#faf5f0] rounded-md overflow-hidden border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/20 transition-colors duration-300 p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-[#1a1a1a] group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <span className="text-[#1a1a1a]/60 text-sm font-medium">
                  Software Solution
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#1a1a1a] group-hover:text-[#1a1a1a]/80 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[#1a1a1a]/70 mb-6">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-[#1a1a1a]/70">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 