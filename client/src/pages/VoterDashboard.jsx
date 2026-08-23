import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { getAllElections } from "../services/electionService";
import { checkVoteStatus } from "../services/voteService";

function VoterDashboard() {
  const [elections, setElections] = useState([]);
  const [voteStatus, setVoteStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const data = await getAllElections();

      if (data.success) {
        setElections(data.elections);

        const statusMap = {};

        for (const election of data.elections) {
          try {
            const status = await checkVoteStatus(election._id);
            statusMap[election._id] = status.voted;
          } catch (error) {
            statusMap[election._id] = false;
          }
        }

        setVoteStatus(statusMap);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">
            Loading Elections...
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">
        Voter Dashboard
      </h1>

      {elections.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            📭 No Elections Available
          </h2>

          <p className="text-gray-500 mt-3">
            The admin has not created any elections yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {elections.map((election) => (
            <div
              key={election._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between">

                {/* Left Section */}
                <div>
                  <h2 className="text-2xl font-bold">
                    {election.title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {election.description}
                  </p>

                  <p className="mt-3">
                    <strong>Start:</strong>{" "}
                    {new Date(
                      election.startDate
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>End:</strong>{" "}
                    {new Date(
                      election.endDate
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* Right Section */}
                <div className="text-right">

                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {election.status}
                  </span>

                  <div className="mt-5">

                    {election.status?.toLowerCase() === "active" ? (

                      voteStatus[election._id] ? (

                        <button
                          disabled
                          className="bg-gray-500 text-white px-5 py-3 rounded-lg cursor-not-allowed"
                        >
                          ✓ Already Voted
                        </button>

                      ) : (

                        <Link to={`/vote/${election._id}`}>
                          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg">
                            🗳 Vote Now
                          </button>
                        </Link>

                      )

                    ) : election.status?.toLowerCase() === "upcoming" ? (

                      <button
                        disabled
                        className="bg-yellow-500 text-white px-5 py-3 rounded-lg cursor-not-allowed"
                      >
                        ⏳ Voting Starts Soon
                      </button>

                    ) : (

                      <button
                        disabled
                        className="bg-red-600 text-white px-5 py-3 rounded-lg cursor-not-allowed"
                      >
                        🔒 Voting Closed
                      </button>

                    )}

                  </div>

                  {/* View Results Button */}
                  <Link to={`/results/${election._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg mt-3 w-full">
                      📊 View Results
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default VoterDashboard;