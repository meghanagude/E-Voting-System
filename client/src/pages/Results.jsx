import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { getResults } from "../services/voteService";

function Results() {
  const { electionId } = useParams();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getResults(electionId);

      if (data.success) {
        setCandidates(data.candidates);
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
        <div className="flex justify-center items-center h-96">
          <div className="text-2xl font-bold animate-pulse">
            Loading Results...
          </div>
        </div>
      </Layout>
    );
  }

  if (candidates.length === 0) {
    return (
      <Layout>
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-3">
            📭 No Results Available
          </h2>

          <p className="text-gray-500">
            No votes have been cast yet.
          </p>
        </div>
      </Layout>
    );
  }

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.totalVotes,
    0
  );

  const winner = candidates[0];

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Election Results
      </h1>

      {/* Winner Card */}

      <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl shadow-xl p-8 mb-8">

        <h2 className="text-3xl font-bold">
          👑 Winner
        </h2>

        <h3 className="text-2xl mt-4 font-semibold">
          {winner.name}
        </h3>

        <p className="mt-2 text-lg">
          {winner.department} • {winner.year}
        </p>

        <p className="text-4xl font-bold mt-4">
          {winner.totalVotes} Votes
        </p>

      </div>

      {/* Results Table */}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4">Rank</th>

              <th className="p-4 text-left">
                Candidate
              </th>

              <th className="p-4">
                Department
              </th>

              <th className="p-4">
                Year
              </th>

              <th className="p-4">
                Votes
              </th>

              <th className="p-4">
                %
              </th>

            </tr>

          </thead>

          <tbody>

            {candidates.map((candidate, index) => {

              const percentage =
                totalVotes === 0
                  ? 0
                  : (
                      (candidate.totalVotes /
                        totalVotes) *
                      100
                    ).toFixed(1);

              return (

                <tr
                  key={candidate._id}
                  className={
                    index === 0
                      ? "bg-yellow-50 border-b"
                      : "border-b hover:bg-gray-50"
                  }
                >

                  <td className="text-center font-bold">

                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}

                  </td>

                  <td className="p-4 font-semibold">

                    {candidate.name}

                  </td>

                  <td className="text-center">

                    {candidate.department}

                  </td>

                  <td className="text-center">

                    {candidate.year}

                  </td>

                  <td className="text-center font-bold">

                    {candidate.totalVotes}

                  </td>

                  <td className="p-4">

                    <div className="w-full bg-gray-200 rounded-full h-3">

                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <p className="text-center mt-1">

                      {percentage}%

                    </p>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* Total Votes */}

      <div className="mt-8 bg-blue-600 text-white rounded-2xl shadow-xl p-6 text-center">

        <h2 className="text-2xl font-bold">
          Total Votes Cast
        </h2>

        <p className="text-5xl mt-3 font-bold">
          {totalVotes}
        </p>

      </div>

    </Layout>
  );
}

export default Results;