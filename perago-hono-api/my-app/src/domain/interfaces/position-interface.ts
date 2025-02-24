interface PositionRepositoryInterface {
  GetPositionById: (id: string) => {};
  CreatePosition: (data: {
    id: string | null;
    name: string;
    description: string | null;
    parentId: string | null;
  }) => {};
  CheckNullParentPosition: () => {};
}

interface PositionCommandServiceInterface {
  CreatePosition: (name: string, description: string, parentId: string) => {};
}

interface PositionQueryServiceInterface {
  GetPositionById: (id: string) => {};
}

export type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
};
