interface PositionRepositoryInterface {
  GetPositionById: (id: string) => Promise<{
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    parentId: string | null;
  }>;
  CreatePosition: (data: {
    id: string | null;
    name: string;
    description: string | null;
    parentId: string | null;
  }) => {};
  CheckNullParentPosition: () => {};
  GetChildPosition: (id: string) => {};
  GetAllPositions: () => {};
  UpdatePosition: (id: string, name: string, description: string) => {};
  DeletePositionById: (id: string) => {};
  GetPositionsByParentId: (parentId: string) => {};
}

interface PositionCommandServiceInterface {
  CreatePosition: (name: string, description: string, parentId: string) => {};
  UpdatePosition: (id: string, name: string, description: string) => {};
  DeletePosition: (id: string) => {};
}

interface PositionQueryServiceInterface {
  GetPositionById: (id: string) => {};
  GetChildrenPositions: (id: string) => {};
  GetAllPositions: () => {};
  GetPositionChoices: () => {};
}

export type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
};
