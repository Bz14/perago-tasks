import type { PositionRepositoryInterface } from "../domain/interfaces/position-interface.js";
import type { PositionQueryServiceInterface } from "../domain/interfaces/position-interface.js";
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
}

export default PositionQueryService;
