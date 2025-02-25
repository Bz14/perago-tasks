import axios from "axios";

const URL = process.env.API_URL || "http://localhost:5000/api/v1";

const createPosition = async (data: {
  name: string;
  description: string;
  parentPosition: string;
}) => {
  try {
    const response = await axios.post(`${URL}/position`, data);
    console.log(response.data);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.message);
  }
};

const getChoices = async () => {
  try {
    const response = await axios.post(`${URL}/positions/choices`);
    return response.data;
  } catch (error: Error | any) {
    throw new Error(error.response.data.message);
  }
};

const positionApi = { createPosition, getChoices };

export default positionApi;
