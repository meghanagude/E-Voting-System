import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import Layout from "../components/layout/Layout";

import {
  getCandidateById,
  updateCandidate,
} from "../services/candidateService";

function EditCandidate() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    manifesto: "",
    image: "",
  });

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const data = await getCandidateById(id);

      if (data.success) {
        setFormData({
          name: data.candidate.name || "",
          department: data.candidate.department || "",
          year: data.candidate.year || "",
          manifesto: data.candidate.manifesto || "",
          image: data.candidate.image || "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load candidate");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateCandidate(id, formData);

      if (data.success) {
        toast.success("Candidate Updated Successfully");

        navigate(`/candidates/${data.candidate.election}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to update candidate");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Candidate
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="manifesto"
            placeholder="Manifesto"
            value={formData.manifesto}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 h-32"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Update Candidate
          </button>
        </form>

      </div>
    </Layout>
  );
}

export default EditCandidate;