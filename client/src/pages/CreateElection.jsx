import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  createElection,
  getElectionById,
  updateElection,
} from "../services/electionService";

function CreateElection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Upcoming",
  });

  useEffect(() => {
    if (isEdit) {
      fetchElection();
    }
  }, []);

  const fetchElection = async () => {
    try {
      const data = await getElectionById(id);

      if (data.success) {
        setFormData({
          title: data.election.title,
          description: data.election.description,
          startDate: data.election.startDate.slice(0, 10),
          endDate: data.election.endDate.slice(0, 10),
          status: data.election.status,
        });
      }
    } catch (error) {
      toast.error("Unable to load election");
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
      if (isEdit) {
        await updateElection(id, formData);

        toast.success("Election Updated Successfully");
      } else {
        await createElection(formData);

        toast.success("Election Created Successfully");
      }

      navigate("/admin");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">

      <h1 className="text-3xl font-bold mb-8">
        {isEdit ? "Edit Election" : "Create Election"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="text"
          name="title"
          placeholder="Election Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Upcoming</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {isEdit
            ? "Update Election"
            : "Create Election"}
        </button>
      </form>

    </div>
  );
}

export default CreateElection;