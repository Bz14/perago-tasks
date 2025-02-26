import axios from "axios";

const URL = process.env.API_URL || "http://localhost:5000/api/v1";

const createPosition = async (data: {
  name: string;
  description: string;
  parentPosition: string;
}) => {
  try {
    const response = await axios.post(`${URL}/position`, data);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const getChoices = async () => {
  try {
    const response = await axios.get(`${URL}/position/choices`);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const getPositions = async () => {
  try {
    const response = await axios.get(`${URL}/positions`);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const getPositionById = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/position/${id}`);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const updatePosition = async (
  id: string,
  data: { name: string; description: string }
) => {
  try {
    const response = await axios.put(`${URL}/position/${id}`, {
      name: data.name,
      description: data.description,
    });
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const deletePositionById = async (id: string) => {
  try {
    const response = await axios.delete(`${URL}/position/${id}`);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${URL}/auth`, data);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.error);
  }
};

const positionApi = {
  createPosition,
  getChoices,
  getPositions,
  getPositionById,
  updatePosition,
  deletePositionById,
  login,
};

export default positionApi;
