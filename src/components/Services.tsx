'use client';

import { motion } from 'framer-motion';
import { FaCode, FaMobile, FaShoppingCart, FaPaintBrush } from 'react-icons/fa';

const services = [
  {
    icon: <FaCode className="w-8 h-8" />,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
    features: ["Responsive Design", "SEO Optimization", "Fast Performance", "Modern UI/UX"]
  },
  {
    icon: <FaMobile className="w-8 h-8" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android using React Native.",
    features: ["Cross-platform", "Native Performance", "Offline Support", "Push Notifications"]
  },
  {
    icon: <FaShoppingCart className="w-8 h-8" />,
    title: "E-commerce Solutions",
    description: "Complete e-commerce solutions with payment integration, inventory management, and admin dashboard.",
    features: ["Secure Payments", "Inventory Management", "Order Tracking", "Analytics"]
  },
  {
    icon: <FaPaintBrush className="w-8 h-8" />,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces with focus on user experience and conversion.",
    features: ["Custom Design", "User Research", "Prototyping", "Brand Identity"]
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-[#faf5f0]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end solutions for your digital needs, from design to development and deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl border border-[#1a1a1a] hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#1a1a1a] text-[#faf5f0] p-3 rounded-lg w-fit mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#1a1a1a] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 