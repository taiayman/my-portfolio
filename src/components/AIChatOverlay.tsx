'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIChatOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedLanguage?: string;
}

const predefinedQuestions = [
  "What can you do?",
  "Tell me about yourself",
  "Who created you?",
  "How are you?",
  "Help"
];

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Français', code: 'fr' },
  { name: 'العربية', code: 'ar' },
];

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export default function AIChatOverlay({ 
  isOpen: externalIsOpen, 
  onClose, 
  selectedLanguage: initialLanguage = 'en' 
}: AIChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLanguages, setShowLanguages] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowLanguages(false);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      content,
      role: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, newMessage],
          language: selectedLanguage 
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        content: data.content,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString(),
      }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {externalIsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div className="bg-white w-full max-w-lg rounded-lg shadow-xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">AI Assistant</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="h-[500px] flex flex-col">
              {showLanguages ? (
                <div className="flex-1 p-6">
                  <h3 className="text-lg font-semibold mb-4 text-center">Choose your language</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            msg.role === 'user' 
                              ? 'bg-black text-white rounded-br-none' 
                              : 'bg-gray-200 text-gray-900 rounded-bl-none'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-50">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-200 rounded-2xl px-4 py-2">
                          <p className="text-sm">...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {predefinedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(question)}
                          className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-sm"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 