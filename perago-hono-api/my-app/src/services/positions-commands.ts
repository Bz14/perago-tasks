import type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
} from "../domain/interfaces/position-interface.js";
import Position from "../domain/Entities/position-entity.js";
class PositionCommandService implements PositionCommandServiceInterface {
  private positionRepository: PositionRepositoryInterface;
  constructor(repository: PositionRepositoryInterface) {
    this.positionRepository = repository;
  }

  CreatePosition = async (
    name: string,
    description: string | null,
    parentId: string | null
  ): Promise<Position> => {
    try {
      const position = new Position(name, description, parentId);

      if (!parentId) {
        const nullCount: any =
          await this.positionRepository.CheckNullParentPosition();
        if (nullCount.length > 0) {
          throw new Error("Only one null parent allowed");
        }
      }

      if (parentId) {
        const parent = await this.positionRepository.GetPositionById(parentId);
        if (!parent) {
          throw new Error("Parent position not found.");
        }
      }

      const newPosition: any = await this.positionRepository.CreatePosition({
        id: position.getId(),
        name: position.getName(),
        description: position.getDescription(),
        parentId: position.getParentId(),
      });

      return newPosition;
    } catch (error: Error | any) {
      throw new Error(error.message);
    }
  };
}

export default PositionCommandService;
