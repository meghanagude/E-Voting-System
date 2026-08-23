import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Layout from "../components/layout/Layout";
import { createCandidate } from "../services/candidateService";

function AddCandidate() {
  const navigate = useNavigate();
  const { electionId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    manifesto: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCandidate({
        ...formData,
        election: electionId,
      });

      toast.success("Candidate Added Successfully");

      navigate(`/candidates/${electionId}`);
    } catch (error) {
      toast.error("Unable to add candidate");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-8">
          Add Candidate
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            name="manifesto"
            placeholder="Manifesto"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full">
            Add Candidate
          </button>

        </form>

      </div>
    </Layout>
  );
}

export default AddCandidate;