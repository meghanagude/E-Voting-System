const authRoutes = require("./routes/authRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const electionRoutes = require("./routes/electionRoutes");
const connectDB = require("./config/db");
const candidateRoutes = require("./routes/candidateRoutes");
const voteRoutes = require("./routes/voteRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/elections", electionRoutes);

app.use("/api/candidates", candidateRoutes);

app.use("/api/votes", voteRoutes);

app.get("/", (req, res) => {
    res.send("E-Voting Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});