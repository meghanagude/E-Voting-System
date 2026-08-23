import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateElection from "./pages/CreateElection";
import CandidateList from "./pages/CandidateList";
import AddCandidate from "./pages/AddCandidate";
import EditCandidate from "./pages/EditCandidate";
import AdminRoute from "./components/AdminRoute";
import VoterDashboard from "./pages/VoterDashboard";
import VotePage from "./pages/VotePage";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <VoterDashboard />
    </PrivateRoute>
  }
  />

  <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/create-election"
  element={
    <AdminRoute>
      <CreateElection />
    </AdminRoute>
  }
/>


<Route
  path="/candidates/:electionId"
  element={
    <AdminRoute>
      <CandidateList />
    </AdminRoute>
  }
/>

<Route
  path="/add-candidate/:electionId"
  element={
    <AdminRoute>
      <AddCandidate />
    </AdminRoute>
  }
/>

<Route
  path="/edit-candidate/:id"
  element={
    <AdminRoute>
      <EditCandidate />
    </AdminRoute>
  }
/>
<Route
  path="/vote/:electionId"
  element={
    <PrivateRoute>
      <VotePage />
    </PrivateRoute>
  }
/>
<Route
  path="/results/:electionId"
  element={
    <PrivateRoute>
      <Results />
    </PrivateRoute>
  }
/>
<Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
<Route
  path="*"
  element={<NotFound />}
/>
</Routes>
    </>
  );
}

export default App;