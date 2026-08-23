import api from "./api";

const getToken = () => localStorage.getItem("token");

export const castVote = async (voteData) => {
  const response = await api.post(
    "/votes",
    voteData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const checkVoteStatus = async (electionId) => {
  const response = await api.get(
    `/votes/status/${electionId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const getResults = async (electionId) => {
  const response = await api.get(
    `/votes/results/${electionId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};