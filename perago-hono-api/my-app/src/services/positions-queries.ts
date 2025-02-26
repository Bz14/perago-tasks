import type { PositionRepositoryInterface } from "../domain/interfaces/position-interface.js";
import type { PositionQueryServiceInterface } from "../domain/interfaces/position-interface.js";
import buildTree from "../utils/buildTree.js";
class PositionQueryService implements PositionQueryServiceInterface {
  private positionRepository: PositionRepositoryInterface;
  constructor(repository: PositionRepositoryInterface) {
    this.positionRepository = repository;
  }

  GetPositionById = async (id: string) => {
    try {
      const position = this.positionRepository.GetPositionById(id);
      return position;
    } catch (error: Error | any) {
      throw new Error(error.message);
    }
  };

  GetChildrenPositions = async (id: string) => {
    try {
      const position = await this.positionRepository.GetPositionById(id);
      if (!position) {
        throw new Error("Position not found");
      }

      const children = this.positionRepository.GetChildPosition(id);
      return children;
    } catch (error: Error | any) {
      throw new Error(error);
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
