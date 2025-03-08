import type { Context } from "hono";

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
  GetPositionsList: (
    page: number,
    limit: number
  ) => Promise<{ id: string; name: string }[]>;

  UpdatePosition: (
    id: string,
    name: string,
    description: string,
    parentId: string | null
  ) => Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
  }>;
  DeletePositionById: (id: string) => Promise<{ rowCount: number | null }>;
  GetPositionsByParentId: (parentId: string) => {};
}

interface PositionCommandServiceInterface {
  CreatePosition: (
    name: string,
    description: string,
    parentId: string
  ) => Promise<Position>;
  UpdatePosition: (
    id: string,
    name: string,
    description: string,
    parentId: string | null
  ) => Promise<Position>;
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
  GetPositionsList: (
    page: string,
    limit: string
  ) => Promise<{ id: string; name: string }[]>;
}

interface PositionControllerInterface {
  CreatePosition: (c: Context) => Promise<Response>;
  UpdatePosition: (c: Context) => Promise<Response>;
  DeletePosition: (c: Context) => Promise<Response>;
  GetPositionById: (c: Context) => Promise<Response>;
  GetPositionChildren: (c: Context) => Promise<Response>;
  GetAllPositions: (c: Context) => Promise<Response>;
  GetPositionChoices: (c: Context) => Promise<Response>;
  GetPositionsList: (c: Context) => Promise<Response>;
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
  PositionControllerInterface,
};
