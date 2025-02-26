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

const positionApi = { createPosition, getChoices };

export default positionApi;
