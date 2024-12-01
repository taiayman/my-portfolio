'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { BiCalculator } from 'react-icons/bi';

const projectQuestions = [
  {
    id: 1,
    question: "What type of project are you looking to build?",
    options: [
      "Web Application",
      "Mobile App",
      "Desktop Software",
      "E-commerce Site",
      "Custom Solution"
    ]
  },
  {
    id: 2,
    question: "What is your estimated timeline?",
    options: [
      "1-2 months",
      "2-3 months",
      "3-4 months",
      "4-6 months",
      "6+ months"
    ]
  },
  {
    id: 3,
    question: "What is your budget range?",
    options: [
      "5,000 - 8,000 MAD",
      "8,000 - 12,000 MAD",
      "12,000 - 15,000 MAD",
      "15,000 - 20,000 MAD",
      "To be discussed"
    ]
  }
];

export default function QuestionOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < projectQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Format the message for WhatsApp
      const projectType = newAnswers[0];
      const timeline = newAnswers[1];
      const budget = newAnswers[2];

      const message = `Hi! I'm interested in building a project:
• Type: ${projectType}
• Timeline: ${timeline}
• Budget: ${budget}

I'd like to discuss the details.`;

      // Close the overlay
      onClose();
      setCurrentQuestion(0);
      setAnswers([]);

      // Open WhatsApp with the pre-filled message
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/212765755723?text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#fcf5eb] p-8 rounded-3xl w-full max-w-2xl mx-4 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <BiX className="w-8 h-8" />
            </button>

            <div className="mb-10 flex items-center gap-4">
              <div className="bg-[#1a1a1a] p-3.5 rounded-2xl">
                <BiCalculator className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Project Calculator</h2>
                <p className="text-gray-500 text-sm mt-1">Get an instant project estimate</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900">Progress</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(((currentQuestion + 1) / projectQuestions.length) * 100)}%
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {projectQuestions.length}
                </span>
              </div>

              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / projectQuestions.length) * 100}%` }}
                  className="h-full bg-[#1a1a1a]"
                  transition={{ ease: "easeInOut", duration: 0.3 }}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {projectQuestions[currentQuestion].question}
                </h3>

                <div className="grid gap-3">
                  {projectQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 text-left rounded-2xl bg-white text-gray-600 transition-all duration-200 border-2 border-transparent hover:border-[#1a1a1a] hover:text-gray-900 group relative overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg">{option}</span>
                        <svg 
                          className="w-5 h-5 transform transition-transform duration-200 translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 