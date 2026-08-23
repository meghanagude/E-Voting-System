const Election = require("../models/Election");

const createElection = async (req, res) => {
  try {
    const { title, description, startDate, endDate } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const election = await Election.create({
      title,
      description,
      startDate,
      endDate,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Election Created Successfully",
      election,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    const today = new Date();

    for (const election of elections) {

      let newStatus = election.status;

      if (today < election.startDate) {
        newStatus = "Upcoming";
      } else if (
        today >= election.startDate &&
        today <= election.endDate
      ) {
        newStatus = "Active";
      } else {
        newStatus = "Completed";
      }

      if (newStatus !== election.status) {
        election.status = newStatus;
        await election.save();
      }
    }

    res.status(200).json({
      success: true,
      count: elections.length,
      elections,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getElectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const election = await Election.findById(id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    res.status(200).json({
      success: true,
      election,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateElection = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, startDate, endDate, status } = req.body;

    // Check if election exists
    const election = await Election.findById(id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    // Update fields
    election.title = title || election.title;
    election.description = description || election.description;
    election.startDate = startDate || election.startDate;
    election.endDate = endDate || election.endDate;
    election.status = status || election.status;

    await election.save();

    res.status(200).json({
      success: true,
      message: "Election updated successfully",
      election,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteElection = async (req, res) => {
  try {
    const { id } = req.params;

    const election = await Election.findById(id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    await Election.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Election deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createElection,
  getAllElections,
  getElectionById,
  updateElection,
  deleteElection,
};