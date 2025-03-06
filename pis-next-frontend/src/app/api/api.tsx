import axios from "axios";
import {
  Position,
  OrganizationNode,
  PositionNode,
} from "../interfaces/interface";

const URL = process.env.API_URL || "http://localhost:5000/api/v1";

const createPosition = async (data: {
  name: string;
  description: string;
  parentId: string;
}): Promise<Position> => {
  try {
    const response = await axios.post(`${URL}/position`, data);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.message);
    }
    if (error instanceof Error) {
      console.log("Here");
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const getChoices = async (): Promise<{ value: string; label: string }[]> => {
  try {
    const response = await axios.get(`${URL}/position/choices`);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const getPositions = async (): Promise<OrganizationNode[]> => {
  try {
    const response = await axios.get(`${URL}/positions`);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const getPositionById = async (id: string | null): Promise<PositionNode> => {
  try {
    const response = await axios.get(`${URL}/position/${id}`);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const updatePosition = async (
  id: string | null,
  data: { name: string; description: string }
): Promise<Position> => {
  try {
    const response = await axios.put(`${URL}/position/${id}`, {
      name: data.name,
      description: data.description,
    });
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const deletePositionById = async (id: string | null): Promise<Position> => {
  try {
    const response = await axios.delete(`${URL}/position/${id}`);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const login = async (data: {
  username: string;
  password: string;
}): Promise<{ id: string; userName: string }> => {
  try {
    const response = await axios.post(`${URL}/auth`, data);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
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
