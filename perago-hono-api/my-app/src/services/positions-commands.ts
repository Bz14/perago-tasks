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
          throw new Error("Only one top position allowed");
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

  UpdatePosition = async (id: string, name: string, description: string) => {
    try {
      const pos: any = await this.positionRepository.GetPositionById(id);
      if (!pos) {
        throw new Error("Position not found.");
      }

      if (!name) {
        name = pos.name;
      }

      if (!description) {
        description = pos.description;
      }
      const position = this.positionRepository.UpdatePosition(
        id,
        name,
        description
      );
      return position;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  };

  DeletePosition = async (id: string) => {
    try {
      const pos: any = await this.positionRepository.GetPositionById(id);
      if (!pos) {
        throw new Error("Position not found");
      }
      console.log(pos);

      if (pos.parentId == null) {
        const children: any =
          await this.positionRepository.GetPositionsByParentId(pos.id);
        if (children.length > 0) {
          throw new Error(`Can't delete the top hierarchy ${pos.name}`);
        }
      }
      const _ = await this.positionRepository.DeletePositionById(id);
      return pos;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  };
}

export default PositionCommandService;
