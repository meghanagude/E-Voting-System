import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/layout/Layout";

import {
  getCandidates,
  deleteCandidate,
} from "../services/candidateService";

function CandidateList() {
  const { electionId } = useParams();

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteCandidate(id);

      if (data.success) {
        toast.success("Candidate Deleted Successfully");
        fetchCandidates();
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete candidate");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Candidates
          </h1>

          <Link to={`/add-candidate/${electionId}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
              + Add Candidate
            </button>
          </Link>

        </div>

        {candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            No Candidates Added Yet
          </div>
        ) : (
          candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-start hover:shadow-xl transition"
            >
              {/* Left Section */}
              <div>
                <h2 className="text-2xl font-bold">
                  {candidate.name}
                </h2>

                <p className="text-gray-700 mt-2">
                  <strong>Department:</strong>{" "}
                  {candidate.department}
                </p>

                <p className="text-gray-700">
                  <strong>Year:</strong>{" "}
                  {candidate.year}
                </p>

                <p className="mt-3 text-gray-600">
                  {candidate.manifesto}
                </p>
              </div>

              {/* Right Section */}
              <div className="text-right">

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  Votes : {candidate.totalVotes || 0}
                </span>

                <div className="flex gap-3 mt-6 justify-end">

                  <Link to={`/edit-candidate/${candidate._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(candidate._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>
    </Layout>
  );
}

export default CandidateList;