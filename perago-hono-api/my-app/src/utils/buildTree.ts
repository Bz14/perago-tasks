import type {
  Position,
  TreeNode,
} from "../domain/interfaces/position-interface.js";
const buildTree = (
  positions: Position[],
  parentId: string | null = null
): TreeNode[] => {
  return positions
    .filter((pos) => pos.parentId == parentId)
    .map((pos) => ({
      id: pos.id,
      name: pos.name,
      description: pos.description,
      children: buildTree(positions, pos.id),
    }));
};

export default buildTree;
