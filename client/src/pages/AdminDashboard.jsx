import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Layout from "../components/layout/Layout";
import StatCard from "../components/dashboard/StatCard";
import ElectionCard from "../components/ElectionCard";

import {
  getAllElections,
  deleteElection,
} from "../services/electionService";

function AdminDashboard() {
  const [elections, setElections] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const data = await getAllElections();

      if (data.success) {
        setElections(data.elections);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this election?"
    );

    if (!confirmDelete) return;

    try {
      const data = await deleteElection(id);

      if (data.success) {
        toast.success("Election deleted successfully");
        fetchElections();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete election");
    }
  };

  // Search Filter
  const filteredElections = elections.filter((election) =>
    election.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            title="Total Elections"
            value={elections.length}
            color="bg-blue-600"
          />

          <StatCard
            title="Active"
            value={
              elections.filter(
                (e) => e.status?.toLowerCase() === "active"
              ).length
            }
            color="bg-green-600"
          />

          <StatCard
            title="Upcoming"
            value={
              elections.filter(
                (e) => e.status?.toLowerCase() === "upcoming"
              ).length
            }
            color="bg-yellow-500"
          />

          <StatCard
            title="Completed"
            value={
              elections.filter(
                (e) => e.status?.toLowerCase() === "completed"
              ).length
            }
            color="bg-red-600"
          />

        </div>

        {/* Search + Create Button */}
        <div className="flex justify-between items-center">

          <input
            type="text"
            placeholder="🔍 Search Elections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link to="/create-election">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              + Create Election
            </button>
          </Link>

        </div>

        {/* Election Cards */}

        {filteredElections.length > 0 ? (
          <div className="space-y-6">

            {filteredElections.map((election) => (
              <ElectionCard
                key={election._id}
                election={election}
                onDelete={handleDelete}
              />
            ))}

          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            No Elections Found
          </div>
        )}

      </div>
    </Layout>
  );
}

export default AdminDashboard;