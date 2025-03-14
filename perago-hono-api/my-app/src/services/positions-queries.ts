import buildTree from "../utils/buildTree.js";
import { HTTPException } from "hono/http-exception";
import positionRepository from "../repositories/positions-repositories.js";
import type {
  TreeNode,
  PositionQueryServiceInterface,
} from "../domain/interfaces/position-interface.js";

const GetPositionById = async (
  id: string,
  userId: string
): Promise<{
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: { id: string; name: string }[];
}> => {
  try {
    const position = await positionRepository.GetPositionById(id, userId);
    if (!position) {
      throw new HTTPException(404, { message: "Position not found" });
    }
    const children = await positionRepository.GetChildrenPosition(id, userId);
    return {
      ...position,
      children: children,
    };
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetChildrenPositions = async (
  id: string,
  userId: string
): Promise<{ id: string; name: string }[]> => {
  try {
    const position = await positionRepository.GetPositionById(id, userId);
    if (!position) {
      throw new HTTPException(400, { message: "Position not found" });
    }
    const children = await positionRepository.GetChildrenPosition(id, userId);
    if (children.length === 0) {
      throw new HTTPException(400, { message: "Position has no children" });
    }
    return children;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};
const GetAllPositions = async (userId: string): Promise<TreeNode[]> => {
  try {
    const positions = await positionRepository.GetAllPositions(userId);
    if (positions.length === 0) {
      throw new HTTPException(404, { message: "No positions found" });
    }
    const tree = buildTree(positions, null);
    return tree;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionChoices = async (userId: string) => {
  try {
    const positions = await positionRepository.GetAllPositions(userId);
    let choices = positions.map((position: any) => {
      return {
        value: position.id,
        label: position.name,
      };
    });

    choices.unshift({ value: "", label: "None" });
    return choices;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};

const GetPositionsList = async (
  userId: string,
  page: string,
  limit: string
): Promise<{ id: string; name: string }[]> => {
  try {
    const currentPage = parseInt(page);
    const queryLimit = parseInt(limit);
    const positions = await positionRepository.GetPositionsList(
      userId,
      currentPage,
      queryLimit
    );
    if (!positions) {
      throw new HTTPException(404, { message: "Positions not found" });
    }
    return positions;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const positionQueryService: PositionQueryServiceInterface = {
  GetPositionById,
  GetChildrenPositions,
  GetAllPositions,
  GetPositionChoices,
  GetPositionsList,
};

export default positionQueryService;
