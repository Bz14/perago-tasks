import type { PositionRepositoryInterface } from "../domain/interfaces/position-interface.js";
import Position from "../domain/Entities/position-entity.js";
class PositionCommandService {
  private positionRepository: PositionRepositoryInterface;
  constructor(repository: PositionRepositoryInterface) {
    this.positionRepository = repository;
  }

  CreatePosition = async (
    name: string,
    description: string,
    parentId: string
  ): Promise<Position> => {
    try {
      const position = new Position(name, description, parentId);
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
