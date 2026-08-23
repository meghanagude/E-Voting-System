E-Voting System

A secure and user-friendly full-stack E-Voting System built using the MERN Stack. The application allows administrators to manage elections and candidates while authenticated voters can securely cast one vote per election and view results.

🚀 Features
🔐 JWT-based authentication
👥 Role-based access control for Admin and Voter
🗳️ Secure vote casting
🚫 One-vote-per-election validation
📋 Election CRUD operations
👤 Candidate CRUD operations
📊 Automatic vote counting and results
📅 Election start/end date validation
🛡️ Protected frontend and backend routes
📱 Responsive UI using Tailwind CSS
🔔 Toast notifications for user actions
🛠️ Tech Stack
Frontend
React.js
Vite
Tailwind CSS
React Router
Axios
React Hot Toast
Backend
Node.js
Express.js
REST APIs
JWT
bcrypt
Database
MongoDB
Mongoose
Deployment
Vercel — Frontend
Render — Backend
MongoDB Atlas — Database
Tools
Git
GitHub

👨‍💼 Admin Module

The administrator can:

Create elections
Edit elections
Delete elections
Add candidates
Edit candidates
Delete candidates
Manage election dates and status
View election results
Monitor election statistics
🗳️ Voter Module

Registered voters can:

Register and log in
View available elections
View election details
View candidates
Cast a vote
Vote only once in each election
View election results
🔒 Security

The application implements several security mechanisms:

JWT Authentication for authenticated sessions
bcrypt for password hashing
Role-Based Access Control for Admin/Voter authorization
Protected Routes on the frontend
Authentication Middleware on the backend
Duplicate Vote Prevention
Election Date Validation
Candidate-Election Validation
🔄 Application Workflow
User Registration/Login
          ↓
    JWT Authentication
          ↓
   Role Verification
      ↙         ↘
   Admin        Voter
     ↓             ↓
Create Election   View Elections
     ↓             ↓
Add Candidates   Select Candidate
     ↓             ↓
Activate Election → Cast Vote
                     ↓
              Vote Validation
                     ↓
              Store Vote in DB
                     ↓
              Update Vote Count
                     ↓
              Display Results
⚙️ Installation
1. Clone the Repository
git clone <your-github-repository-url>
cd Secure-E-Voting-System
2. Backend Setup
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm start

For development:

npm run dev
3. Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

The Vite development server will provide the local frontend URL.

🌐 Deployment

The application can be deployed using:

Component	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas

Update the frontend API configuration with the deployed backend URL before deploying the frontend.

🗄️ Main Database Collections
Users

Stores:

Name
Email
Password
Role
Elections

Stores:

Title
Description
Start Date
End Date
Status
Candidates

Stores:

Name
Department
Year
Manifesto
Image
Total Votes
Election ID
Votes

Stores:

Voter ID
Election ID
Candidate ID
🎯 Project Objectives
Digitize the election process
Reduce manual election management
Provide secure authentication
Prevent duplicate voting
Simplify candidate and election management
Automate vote counting
Provide quick and transparent election results
🔮 Future Enhancements
Email verification
OTP authentication
Multi-factor authentication
Biometric voter verification
Blockchain-based voting
AI-based fraud detection
Advanced election analytics
👩‍💻 Developer

Meghana Gude
Computer Science and Engineering

📄 License

This project was developed as an academic/final-year project for educational and demonstration purposes.
