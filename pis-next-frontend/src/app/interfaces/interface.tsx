export interface Position {
  id: number;
  name: string;
  description: string;
  parentId: string | null;
}

export type FormData = {
  name: string;
  description: string;
  parentPosition: string;
};

export type OrganizationNode = {
  id: string;
  name: string;
  description: string;
  children?: OrganizationNode[];
};
