const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  castVote,
  getResults,
  hasUserVoted,
} = require("../controllers/voteController");

// Cast Vote
router.post("/", protect, castVote);

// Results
router.get("/results/:electionId", protect, getResults);

// Has User Voted
router.get("/status/:electionId", protect, hasUserVoted);

module.exports = router;