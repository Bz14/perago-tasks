import type { Context } from "hono";

interface PositionRepositoryInterface {
  GetPositionById: (id: string | null, userId: string) => Promise<Position>;
  CreatePosition: (data: {
    name: string;
    description: string;
    parentId: string | null;
    createdBy: string;
  }) => Promise<Position>;
  CheckNullParentPosition: (userId: string) => Promise<{ id: string }>;
  GetChildrenPosition: (
    id: string,
    userId: string
  ) => Promise<{ id: string; name: string }[]>;
  GetAllPositions: (userId: string) => Promise<Position[]>;
  GetPositionsList: (
    userId: string,
    page: number,
    limit: number
  ) => Promise<{ id: string; name: string }[]>;

  UpdatePosition: (
    userId: string,
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
  DeletePositionById: (
    id: string,
    userId: string
  ) => Promise<{ rowCount: number | null }>;
  GetPositionsByParentId: (parentId: string) => {};
}
interface PositionCommandServiceInterface {
  CreatePosition: (
    userId: string,
    name: string,
    description: string,
    parentId: string
  ) => Promise<Position>;
  UpdatePosition: (
    userId: string,
    id: string,
    name: string,
    description: string,
    parentId: string | null
  ) => Promise<Position>;
  DeletePosition: (id: string, userId: string) => Promise<Position>;
}
interface PositionQueryServiceInterface {
  GetPositionById: (
    id: string,
    userId: string
  ) => Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
    children: { id: string; name: string }[];
  }>;
  GetChildrenPositions: (
    id: string,
    userId: string
  ) => Promise<{ id: string; name: string }[]>;
  GetAllPositions: (userId: string) => Promise<TreeNode[]>;
  GetPositionChoices: (
    userId: string
  ) => Promise<{ value: string; label: string }[]>;
  GetPositionsList: (
    userId: string,
    page: string,
    limit: string
  ) => Promise<{ id: string; name: string }[]>;
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
