import api from "./api";

export const createElection = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    "/elections",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};