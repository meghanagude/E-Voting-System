const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
        success: false,
        message: "Email already registered"
        });
    }
    
    /*console.log("Received Data:");
    console.log(name);
    console.log(email);
    console.log(password);*/
    // Check if user already exists
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
    name,
    email,
    password: hashedPassword
    });
    
    const token = generateToken(user._id, user.role);
    /*console.log("Generated JWT:");
    console.log(token);*/

    return res.status(201).json({
    success:true,

    message:"Registration Successful",

    token,

    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        hasVoted:user.hasVoted
    }
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    // Get data from request
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    // Send response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hasVoted: user.hasVoted,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const profile = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  profile,
};