import api from "./api";

// Get All Elections
export const getAllElections = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/elections", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Create Election
export const createElection = async (electionData) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/elections", electionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update Election
export const updateElection = async (id, electionData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/elections/${id}`,
    electionData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getElectionById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/elections/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Delete Election
export const deleteElection = async (id) => {
  const token = localStorage.getItem("token");

  const response = await api.delete(`/elections/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};