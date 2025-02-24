import type { PositionRepositoryInterface } from "../domain/interfaces/position-interface.js";
import Position from "../domain/Entities/position-entity.js";
class PositionQueryService {
  private positionRepository: PositionRepositoryInterface;
  constructor(repository: PositionRepositoryInterface) {
    this.positionRepository = repository;
  }
}

export default PositionQueryService;
