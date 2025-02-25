import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../lib/store';
import { RefreshCw } from 'lucide-react';

export const TypingInterface = () => {
  const {
    words,
    currentWordIndex,
    typedWord,
    isGameStarted,
    timeLeft,
    gameEnded,
    updateTypedWord,
    nextWord,
    startGame,
    resetGame,
  } = useGameStore();

  const currentWord = words[currentWordIndex];

  const handleInput = (e) => {
    const value = e.target.value;
    updateTypedWord(value);

    if (!isGameStarted && value.length === 1) {
      startGame();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' && typedWord !== '') {
      const isCorrect = typedWord.trim() === currentWord;
      nextWord(isCorrect);
      updateTypedWord('');
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      updateTypedWord('');
    }
  }, [timeLeft, updateTypedWord]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="mb-8">
        <div className="text-3xl font-bold mb-4">
          {words.slice(currentWordIndex, currentWordIndex + 3).map((word, i) => (
            <span
              key={i}
              className={`mr-2 ${
                i === 0
                  ? typedWord.trim() !== '' && typedWord.trim() !== word
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          value={typedWord}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={timeLeft === 0}
          className="w-full p-4 text-xl rounded-lg border-2 border-gray-300 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
                   transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={timeLeft === 0 ? "Game Over!" : "Press Enter to submit word..."}
          autoFocus
        />
        {gameEnded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              resetGame();
              setTimeout(() => document.querySelector('input').focus(), 0);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                     bg-blue-600 text-white hover:bg-blue-700
                     transition-colors duration-200
                     flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};