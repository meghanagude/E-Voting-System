const express = require("express");

const router = express.Router();

const adminOnly = require("../middleware/adminMiddleware");

const {
  createElection,
  updateElection,
  deleteElection,
  getAllElections,
  getElectionById,
} = require("../controllers/electionController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createElection);

router.put("/:id", protect, adminOnly, updateElection);

router.delete("/:id", protect, adminOnly, deleteElection);

// Everyone who is logged in can view elections
router.get("/", protect, getAllElections);

router.get("/:id", protect, getElectionById);


module.exports = router;