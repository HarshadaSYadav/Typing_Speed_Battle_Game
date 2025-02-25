import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Target, Zap } from 'lucide-react';
import { useGameStore } from '../lib/store';

export const GameStats = () => {
  const { wpm, accuracy, isGameStarted, timeLeft } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8"
    >
      <StatCard
        icon={<Zap className="w-6 h-6" />}
        label="WPM"
        value={isGameStarted ? wpm : '-'}
      />
      <StatCard
        icon={<Target className="w-6 h-6" />}
        label="Accuracy"
        value={isGameStarted ? `${accuracy}%` : '-'}
      />
      <StatCard
        icon={<Timer className="w-6 h-6" />}
        label="Time"
        value={`${timeLeft}s`}
      />
    </motion.div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {value}
    </div>
  </div>
);