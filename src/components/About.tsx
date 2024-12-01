'use client';

import { motion } from 'framer-motion';
import { FaCode, FaLightbulb, FaRocket, FaUsers } from 'react-icons/fa';

const stats = [
  {
    icon: <FaCode className="w-6 h-6" />,
    value: "50+",
    label: "Projects Completed"
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    value: "30+",
    label: "Happy Clients"
  },
  {
    icon: <FaLightbulb className="w-6 h-6" />,
    value: "5+",
    label: "Years Experience"
  },
  {
    icon: <FaRocket className="w-6 h-6" />,
    value: "100%",
    label: "Client Satisfaction"
  }
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 bg-[#1a1a1a] text-[#faf5f0]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">About Us</h2>
          <p className="text-[#faf5f0]/80 max-w-2xl mx-auto text-sm md:text-base">
            We are a passionate team of developers and designers dedicated to creating exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Our Mission</h3>
            <p className="text-[#faf5f0]/80 mb-6 text-sm md:text-base">
              To empower businesses with innovative digital solutions that drive growth and success. We believe in creating 
              not just websites and applications, but experiences that leave a lasting impression.
            </p>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
              <li className="flex items-start">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#faf5f0] mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Custom solutions tailored to your needs</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#faf5f0] mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Modern and scalable technology stack</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#faf5f0] mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Dedicated support and maintenance</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4 md:gap-6 order-1 md:order-2"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#faf5f0]/10 p-4 md:p-6 rounded-xl text-center"
              >
                <div className="bg-[#faf5f0]/10 p-2 md:p-3 rounded-lg w-fit mx-auto mb-3 md:mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">{stat.value}</div>
                <div className="text-[#faf5f0]/60 text-xs md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 