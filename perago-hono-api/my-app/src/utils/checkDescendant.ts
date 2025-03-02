import type { Position } from "../domain/interfaces/position-interface.js";

const getDescendantIds = (
  positions: Position[],
  parentId: string | null = null
): string[] => {
  const descendants = positions
    .filter((pos) => pos.parentId == parentId)
    .flatMap((pos) => [pos.id, ...getDescendantIds(positions, pos.id)]);
  return descendants;
};

export default getDescendantIds;
