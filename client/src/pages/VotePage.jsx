import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Layout from "../components/layout/Layout";
import {
  getCandidates,
} from "../services/candidateService";

import {
  castVote,
  checkVoteStatus,
} from "../services/voteService";

function VotePage() {
  const { electionId } = useParams();

  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchCandidates();
    checkStatus();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates(electionId);

      if (data.success) {
        setCandidates(data.candidates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkStatus = async () => {
    try {
      const data = await checkVoteStatus(electionId);

      setHasVoted(data.voted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (candidateId) => {
    if (hasVoted) {
      toast.error("You have already voted.");
      return;
    }

    const confirmVote = window.confirm(
      "Are you sure you want to vote for this candidate?"
    );

    if (!confirmVote) return;

    try {
      const data = await castVote({
        electionId,
        candidateId,
      });

      if (data.success) {
        toast.success("Vote Cast Successfully");

        navigate("/dashboard");
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to cast vote"
      );
    }
  };

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Vote
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {candidates.map((candidate) => (

          <div
            key={candidate._id}
            className="bg-white rounded-xl shadow-lg p-6"
          >

            <img
              src={
                candidate.image ||
                "https://placehold.co/300x300?text=Candidate"
              }
              alt={candidate.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {candidate.name}
            </h2>

            <p className="text-gray-600">
              {candidate.department}
            </p>

            <p className="text-gray-600">
              Year {candidate.year}
            </p>

            <p className="mt-4">
              {candidate.manifesto}
            </p>

            <button
              onClick={() => handleVote(candidate._id)}
              disabled={hasVoted}
              className={`w-full mt-6 py-3 rounded-lg text-white ${
                hasVoted
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {hasVoted ? "Already Voted" : "Vote"}
            </button>

          </div>

        ))}

      </div>

    </Layout>
  );
}

export default VotePage;