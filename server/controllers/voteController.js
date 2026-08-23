const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");
const Election = require("../models/Election");

// Cast Vote
const castVote = async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;

    const voterId = req.user.id;

    // Prevent admin from voting
    if (req.user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admins are not allowed to vote.",
      });
    }

    // Check election
    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    const today = new Date();

    // Election has not started
    if (today < election.startDate) {
      return res.status(400).json({
        success: false,
        message: "Voting has not started yet.",
      });
    }

    // Election ended
    if (today > election.endDate) {
      return res.status(400).json({
        success: false,
        message: "Voting has ended.",
      });
    }

    // Candidate must belong to this election
    const candidate = await Candidate.findOne({
      _id: candidateId,
      election: electionId,
    });

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Prevent duplicate vote
    const alreadyVoted = await Vote.findOne({
      voter: voterId,
      election: electionId,
    });

    if (alreadyVoted) {
      return res.status(400).json({
        success: false,
        message: "You have already voted in this election.",
      });
    }

    // Save vote
    await Vote.create({
      voter: voterId,
      election: electionId,
      candidate: candidateId,
    });

    // Increase vote count
    candidate.totalVotes += 1;
    await candidate.save();

    res.status(201).json({
      success: true,
      message: "Vote Cast Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Results
const getResults = async (req, res) => {
  try {
    const { electionId } = req.params;

    const candidates = await Candidate.find({
      election: electionId,
    }).sort({
      totalVotes: -1,
    });

    res.status(200).json({
      success: true,
      candidates,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Check Vote Status
const hasUserVoted = async (req, res) => {
  try {
    const vote = await Vote.findOne({
      voter: req.user.id,
      election: req.params.electionId,
    });

    res.status(200).json({
      success: true,
      voted: !!vote,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  castVote,
  getResults,
  hasUserVoted,
};