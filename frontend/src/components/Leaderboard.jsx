import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Loader } from "lucide-react";
import axios from "axios";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leaderboard");
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-blue-600 dark:bg-blue-700 text-white flex items-center">
          <Trophy className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">Leaderboard</h2>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <Loader className="animate-spin inline-block w-6 h-6 mr-2" />
            Loading...
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <div
                  key={user._id}
                  className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    index === 0 ? "bg-yellow-100 dark:bg-yellow-900" : ""
                  }`}
                >
                  {/* Rank & User Info */}
                  <div className="flex items-center">
                    <span
                      className={`text-2xl font-bold w-12 ${
                        index === 0
                          ? "text-yellow-500"
                          : index === 1
                          ? "text-gray-400"
                          : index === 2
                          ? "text-orange-400"
                          : "text-gray-500"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {user.username} - {user.wpm} WPM
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Accuracy: {user.accuracy}%
                      </div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No scores yet! Play a game to set your first record.
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
