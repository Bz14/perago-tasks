interface PositionRepositoryInterface {
  GetPositionById: (id: string | null) => Promise<Position>;
  CreatePosition: (data: {
    name: string;
    description: string;
    parentId: string | null;
  }) => Promise<Position>;
  CheckNullParentPosition: () => Promise<{ id: string }>;
  GetChildrenPosition: (id: string) => Promise<{ id: string; name: string }[]>;
  GetAllPositions: () => Promise<Position[]>;

  UpdatePosition: (id: string, name: string, description: string) => {};
  DeletePositionById: (id: string) => Promise<{ rowCount: number | null }>;
  GetPositionsByParentId: (parentId: string) => {};
}

interface PositionCommandServiceInterface {
  CreatePosition: (
    name: string,
    description: string,
    parentId: string
  ) => Promise<Position>;
  UpdatePosition: (id: string, name: string, description: string) => {};
  DeletePosition: (id: string) => Promise<Position>;
}

interface PositionQueryServiceInterface {
  GetPositionById: (id: string) => Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
    children: { id: string; name: string }[];
  }>;
  GetChildrenPositions: (id: string) => Promise<{ id: string; name: string }[]>;
  GetAllPositions: () => Promise<TreeNode[]>;
  GetPositionChoices: () => {};
}
export type Position = {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
};

export type TreeNode = {
  id: string;
  name: string;
  description: string;
  children: TreeNode[];
};

export type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
};
