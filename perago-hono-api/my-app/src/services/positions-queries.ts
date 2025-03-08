import { HTTPException } from "hono/http-exception";
import buildTree from "../utils/buildTree.js";
import positionRepository from "../repositories/positions-repositories.js";
import type {
  TreeNode,
  PositionQueryServiceInterface,
} from "../domain/interfaces/position-interface.js";

const GetPositionById = async (
  id: string
): Promise<{
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: { id: string; name: string }[];
}> => {
  try {
    const position = await positionRepository.GetPositionById(id);
    if (!position) {
      throw new HTTPException(404, { message: "Position not found" });
    }
    const children = await positionRepository.GetChildrenPosition(id);
    return {
      ...position,
      children: children,
    };
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetChildrenPositions = async (
  id: string
): Promise<{ id: string; name: string }[]> => {
  try {
    const position = await positionRepository.GetPositionById(id);
    if (!position) {
      throw new HTTPException(400, { message: "Position not found" });
    }
    const children = await positionRepository.GetChildrenPosition(id);
    if (children.length === 0) {
      throw new HTTPException(400, { message: "Position has no children" });
    }
    return children;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};
const GetAllPositions = async (): Promise<TreeNode[]> => {
  try {
    const positions = await positionRepository.GetAllPositions();
    if (positions.length === 0) {
      throw new HTTPException(404, { message: "No positions found" });
    }
    const tree = buildTree(positions, null);
    return tree;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const GetPositionChoices = async () => {
  try {
    const positions: any = await positionRepository.GetAllPositions();
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
  page: string,
  limit: string
): Promise<{ id: string; name: string }[]> => {
  try {
    const currentPage = parseInt(page);
    const queryLimit = parseInt(limit);
    const positions = await positionRepository.GetPositionsList(
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
