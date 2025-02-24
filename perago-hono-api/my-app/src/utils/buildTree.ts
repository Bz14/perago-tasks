const buildTree = (positions: any[], parentId: string | null = null): any => {
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
