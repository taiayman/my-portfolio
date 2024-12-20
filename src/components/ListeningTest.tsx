import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Question {
  id: number;
  situation: string;
  question: string;
  options: string[];
  audioUrl: string;
  duration: string;
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    situation: 'A woman is talking about her new job.',
    question: 'What does she like most about her new job?',
    options: [
      'The flexible working hours',
      'The friendly colleagues',
      'The convenient location',
      'The good salary'
    ],
    audioUrl: '/audio/question1.mp3',
    duration: '00:45',
    correctAnswer: 1
  },
  {
    id: 2,
    situation: 'Jessica is buying clothes.',
    question: 'What is true about Jessica?',
    options: [
      'is buying a dress and a skirt',
      'thinks the skirts are expensive',
      'can\'t find a red skirt',
      'pays $30 for the skirt'
    ],
    audioUrl: '/audio/question2.mp3',
    duration: '00:38',
    correctAnswer: 2
  },
  {
    id: 3,
    situation: 'Two friends are discussing weekend plans.',
    question: 'What do they decide to do?',
    options: [
      'Go to a movie',
      'Visit a museum',
      'Have dinner at a restaurant',
      'Go hiking'
    ],
    audioUrl: '/audio/question3.mp3',
    duration: '00:42',
    correctAnswer: 3
  }
];

const ListeningTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('15:00');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(questions[currentQuestion].audioUrl);
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));

    // Initialize timer
    let minutes = 15;
    let seconds = 0;
    timerRef.current = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => {
      audioRef.current?.removeEventListener('timeupdate', updateProgress);
      audioRef.current?.removeEventListener('ended', () => setIsPlaying(false));
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestion]);

  const updateProgress = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setProgress(0);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
    setShowResults(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setProgress(0);
    setTimeLeft('15:00');
    setScore(0);
    setShowResults(false);
    setAnswers(Array(questions.length).fill(null));
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  if (showResults) {
    return (
      <div className="h-full w-full bg-[#f0f9fc] text-gray-900">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Test Results</span>
          </div>
        </div>

        <div className="p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Test Complete!</h2>
            <p className="text-xl mb-8">Your score: {score} out of {questions.length}</p>
            
            <div className="mb-8">
              <div className="w-full h-4 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-[#2B95CE] rounded-full"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {Math.round((score / questions.length) * 100)}% Correct
              </p>
            </div>

            {questions.map((question, index) => (
              <div key={index} className="mb-6 text-left bg-white rounded-lg p-6 shadow-sm">
                <p className="font-medium mb-2">
                  Question {index + 1}: {question.situation}
                </p>
                <p className="text-[#2B95CE] mb-4">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg ${
                        optionIndex === question.correctAnswer
                          ? 'bg-green-100 text-green-800'
                          : answers[index] === optionIndex
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-50'
                      }`}
                    >
                      {String.fromCharCode(97 + optionIndex)}) {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleRetry}
              className="px-8 py-3 bg-[#2B95CE] text-white rounded-lg hover:bg-[#2487bc] transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#f0f9fc] text-gray-900">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l-2.828 2.828m2.828-2.828a9 9 0 010-12.728m2.828 2.828a5 5 0 00-1.414 1.414m0 0L5.586 8.464" />
          </svg>
          <span className="font-medium">Listening Test</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{timeLeft}</span>
          </div>
          <button 
            onClick={handleSubmit}
            className="px-4 py-1 text-sm text-red-500 hover:text-red-600 font-medium"
          >
            End Test
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-[#2B95CE] rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Header */}
          <div className="mb-8">
            <div className="text-lg font-medium mb-2">Situation {currentQuestion + 1}: {questions[currentQuestion].situation}</div>
            <div className="text-lg font-medium text-[#2B95CE]">{questions[currentQuestion].question}</div>
          </div>

          {/* Audio Player */}
          <div className="mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="relative w-full h-2 bg-gray-200 rounded-full">
                <motion.div 
                  className="absolute left-0 top-0 h-full bg-[#2B95CE] rounded-full"
                  style={{ width: `${progress}%` }}
                />
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2B95CE] rounded-full shadow"
                  style={{ left: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>00:00</span>
                <span>{questions[currentQuestion].duration}</span>
              </div>
              <div className="flex justify-center mt-4">
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 bg-[#2B95CE] text-white rounded-full flex items-center justify-center hover:bg-[#2487bc] transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d={isPlaying ? "M6 4h4v16H6V4zm8 0h4v16h-4V4z" : "M8 5v14l11-7z"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <label key={index} className="block">
                <div className={`flex items-center bg-white p-4 rounded-lg hover:bg-gray-50 cursor-pointer border ${
                  selectedAnswer === index ? 'border-[#2B95CE]' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="answer"
                    className="w-4 h-4 text-[#2B95CE] border-gray-300 focus:ring-[#2B95CE]"
                    checked={selectedAnswer === index}
                    onChange={() => setSelectedAnswer(index)}
                  />
                  <span className="ml-3">{String.fromCharCode(97 + index)}) {option}</span>
                </div>
              </label>
            ))}
          </div>

          {/* Next Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 bg-[#2B95CE] text-white rounded-lg transition-colors font-medium ${
                selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2487bc]'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Submit Test' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningTest; 