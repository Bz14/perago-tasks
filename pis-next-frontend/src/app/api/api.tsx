import axios from "axios";
import {
  Position,
  OrganizationNode,
  PositionNode,
  LoginFormData,
} from "../interfaces/interface";

const URL = process.env.API_URL || "http://localhost:5000/api/v1";

const createPosition = async (data: {
  name: string;
  description: string;
  parentId: string;
}): Promise<Position> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${URL}/position`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const getChoices = async (): Promise<{ value: string; label: string }[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${URL}/position/choices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const getPositions = async (): Promise<OrganizationNode[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${URL}/positions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const getPositionById = async (id: string | null): Promise<PositionNode> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${URL}/position/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const updatePosition = async (
  id: string | null,
  data: { name: string; description: string; parentId: string }
): Promise<Position> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.put(
      `${URL}/position/${id}`,
      {
        name: data.name,
        description: data.description,
        parentId: data.parentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const deletePositionById = async (id: string | null): Promise<Position> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.delete(`${URL}/position/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const getPositionList = async (
  page: number,
  limit: number
): Promise<{ id: string; name: string }[]> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${URL}/positions/list?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

const login = async (data: LoginFormData): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post(`${URL}/auth/login`, data);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
    }

    throw new Error("An unknown error occurred");
  }
};

const signup = async (
  data: LoginFormData
): Promise<{ id: string; email: string }> => {
  try {
    const response = await axios.post(`${URL}/auth/signup`, data);
    return response.data.data;
  } catch (error: Error | unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || error.message);
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
  getPositionList,
  login,
  signup,
};

export default positionApi;
