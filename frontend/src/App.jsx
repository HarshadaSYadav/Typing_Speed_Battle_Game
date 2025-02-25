import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { TypingInterface } from "./components/TypingInterface";
import { GameStats } from "./components/GameStats";
import { Leaderboard } from "./components/Leaderboard";
import Login from "./components/Login";
import Register from "./components/Register"; // Also check Register.jsx
import { useGameStore } from "./lib/store";

// Sample words - in production, this would come from an API
const SAMPLE_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "keyboard",
  "typing", "speed", "test", "practice", "improve", "skills", "words"
];

function Home() {
  const { theme, toggleTheme, setWords } = useGameStore();

  useEffect(() => {
    // Shuffle words and set them
    const shuffled = [...SAMPLE_WORDS].sort(() => Math.random() - 0.5);
    setWords(shuffled);
  }, [setWords]);

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-4xl font-bold">Typing Speed Battle</h1>

            <div className="flex space-x-4">
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Register
                </button>
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>

          <GameStats />
          <TypingInterface />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
}

export default App;
