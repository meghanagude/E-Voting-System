import api from "./api";

const getToken = () => localStorage.getItem("token");

// Get candidates by election
export const getCandidates = async (electionId) => {
  const response = await api.get(`/candidates/${electionId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

// Add candidate
export const createCandidate = async (candidateData) => {
  const response = await api.post(
    "/candidates",
    candidateData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const deleteCandidate = async (id) => {
  const response = await api.delete(`/candidates/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const getCandidateById = async (id) => {
  const response = await api.get(`/candidates/single/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateCandidate = async (id, candidateData) => {
  const response = await api.put(
    `/candidates/${id}`,
    candidateData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};