import type { Position } from "../domain/interfaces/position-interface.js";
const checkDescendant = (
  positions: Position[],
  childId: string | null,
  parentId: string | null = null
): boolean => {
  const children = positions.filter((pos) => pos.parentId == parentId);
  if (children.length === 0) {
    return false;
  }
  if (children.some((pos) => pos.id === childId)) {
    return true;
  }
  return children.some((pos) => checkDescendant(positions, childId, pos.id));
};

export default checkDescendant;
