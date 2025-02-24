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
}

interface PositionCommandServiceInterface {
  CreatePosition: (name: string, description: string, parentId: string) => {};
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
