const Candidate = require("../models/Candidate");

// Create Candidate
const createCandidate = async (req, res) => {
  try {
    const {
      name,
      department,
      year,
      manifesto,
      image,
      election,
    } = req.body;

    if (!name || !department || !year || !election) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const candidate = await Candidate.create({
      name,
      department,
      year,
      manifesto,
      image,
      election,
    });

    res.status(201).json({
      success: true,
      message: "Candidate Added Successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Candidates By Election
const getCandidatesByElection = async (req, res) => {
  try {
    const { electionId } = req.params;

    const candidates = await Candidate.find({
      election: electionId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    await Candidate.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      success: true,
      candidate,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    Object.assign(candidate, req.body);

    await candidate.save();

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      candidate,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCandidate,
  getCandidatesByElection,
  deleteCandidate,
  getCandidateById,
  updateCandidate,

};