const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateById,
  getCandidatesByElection,
} = require("../controllers/candidateController");

router.post("/", protect, adminOnly, createCandidate);

router.delete("/:id", protect, adminOnly, deleteCandidate);

router.put("/:id", protect, adminOnly, updateCandidate);

// Everyone logged in can view candidates
router.get("/:electionId", protect, getCandidatesByElection);

router.get("/single/:id", protect, getCandidateById);

module.exports = router;