import type { Context } from "hono";
interface AdminRepositoryInterface {
  GetAdmin: (userName: string) => Promise<{ username: string; id: string }>;
  CreateAdmin: (
    userName: string,
    password: string
  ) => Promise<{ username: string; id: string }>;
}

interface AdminCommandServiceInterface {
  CreateAdmin: (
    userName: string,
    password: string
  ) => Promise<{ username: string; id: string }>;
}

interface AdminQueryServiceInterface {
  GetAdmin: (
    userName: string,
    password: string
  ) => Promise<{ username: string; id: string }>;
}

interface AdminControllerInterface {
  CreateAdmin: (c: Context) => Promise<Response>;
  GetAdmin: (c: Context) => Promise<Response>;
}

export type {
  AdminRepositoryInterface,
  AdminCommandServiceInterface,
  AdminQueryServiceInterface,
  AdminControllerInterface,
};
