interface PositionRepositoryInterface {
  GetPositionById: (id: string) => {};
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
}

interface PositionCommandServiceInterface {
  CreatePosition: (name: string, description: string, parentId: string) => {};
  UpdatePosition: (id: string, name: string, description: string) => {};
}

interface PositionQueryServiceInterface {
  GetPositionById: (id: string) => {};
  GetChildrenPositions: (id: string) => {};
  GetAllPositions: () => {};
}

export type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
};
