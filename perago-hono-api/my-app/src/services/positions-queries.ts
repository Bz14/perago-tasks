import { HTTPException } from "hono/http-exception";
import type { PositionRepositoryInterface } from "../domain/interfaces/position-interface.js";
import type { PositionQueryServiceInterface } from "../domain/interfaces/position-interface.js";
import buildTree from "../utils/buildTree.js";
class PositionQueryService implements PositionQueryServiceInterface {
  private positionRepository: PositionRepositoryInterface;
  constructor(repository: PositionRepositoryInterface) {
    this.positionRepository = repository;
  }

  GetPositionById = async (
    id: string
  ): Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
    children: { id: string; name: string }[];
  }> => {
    try {
      const position = await this.positionRepository.GetPositionById(id);
      if (!position) {
        throw new HTTPException(404, { message: "Position not found" });
      }
      const children = await this.positionRepository.GetChildrenPosition(id);
      return {
        ...position,
        children: children,
      };
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  };

  GetChildrenPositions = async (
    id: string
  ): Promise<{ id: string; name: string }[]> => {
    try {
      const position = await this.positionRepository.GetPositionById(id);
      if (!position) {
        throw new HTTPException(400, { message: "Position not found" });
      }
      const children = await this.positionRepository.GetChildrenPosition(id);
      if (children.length === 0) {
        throw new HTTPException(400, { message: "Position has no children" });
      }
      return children;
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  };

  GetAllPositions = async () => {
    try {
      const positions: any = await this.positionRepository.GetAllPositions();
      const tree = buildTree(positions, null);
      return tree;
    } catch (error: Error | any) {
      throw new error(error);
    }
  };

  GetPositionChoices = async () => {
    try {
      const positions: any = await this.positionRepository.GetAllPositions();
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
}
export default PositionQueryService;
