interface PositionRepositoryInterface {
  GetPositionById: (id: string | null) => Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
  }>;
  CreatePosition: (data: {
    name: string;
    description: string;
    parentId: string | null;
  }) => Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
  }>;
  CheckNullParentPosition: () => Promise<{ id: string }>;
  GetChildrenPosition: (id: string) => Promise<{ id: string; name: string }[]>;
  GetAllPositions: () => Promise<
    {
      id: string;
      name: string;
      description: string;
      parentId: string | null;
    }[]
  >;
  UpdatePosition: (id: string, name: string, description: string) => {};
  DeletePositionById: (id: string) => {};
  GetPositionsByParentId: (parentId: string) => {};
}

interface PositionCommandServiceInterface {
  CreatePosition: (
    name: string,
    description: string,
    parentId: string
  ) => Promise<Position>;
  UpdatePosition: (id: string, name: string, description: string) => {};
  DeletePosition: (id: string) => {};
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
  GetAllPositions: () => {};
  GetPositionChoices: () => {};
}

interface Position {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
}

export type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
  Position,
};
