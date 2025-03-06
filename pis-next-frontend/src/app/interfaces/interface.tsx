export interface Position {
  id: number;
  name: string;
  description: string;
  parentId: string | null;
}

export type FormData = {
  name: string;
  description: string;
  parentId: string;
};

export type OrganizationNode = {
  id: string;
  name: string;
  description: string;
  children?: OrganizationNode[];
};

export type PositionNode = {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: {
    id: string;
    name: string;
  }[];
};

export type TreeNode = {
  value: string;
  label: string;
  children?: TreeNode[];
};

export type LoginFormData = {
  username: string;
  password: string;
};
