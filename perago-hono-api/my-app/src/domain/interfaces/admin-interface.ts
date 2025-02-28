import type { Context } from "hono";
interface AdminRepositoryInterface {
  GetAdmin: (userName: string) => {};
  CreateAdmin: (userName: string, password: string) => {};
}

interface AdminCommandServiceInterface {
  CreateAdmin: (userName: string, password: string) => {};
}

interface AdminQueryServiceInterface {
  GetAdmin: (userName: string, password: string) => {};
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
