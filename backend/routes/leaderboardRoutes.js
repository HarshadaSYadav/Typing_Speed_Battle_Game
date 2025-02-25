const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Update user score
router.post("/update", async (req, res) => {
  const { userId, score } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.score = Math.max(user.score, score); // Keep highest score
    await user.save();

    res.json({ msg: "Score updated", score: user.score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get("/", async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
