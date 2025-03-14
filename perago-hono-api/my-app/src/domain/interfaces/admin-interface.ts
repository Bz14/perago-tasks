import type { Context } from "hono";
interface AdminRepositoryInterface {
  createAdmin: (
    email: string,
    password: string
  ) => Promise<{ email: string; id: string }>;
  getAdminByEmail: (
    email: string
  ) => Promise<{ id: string; email: string; password: string }>;
}
interface AdminCommandServiceInterface {
  CreateAdmin: (
    email: string,
    password: string
  ) => Promise<{ email: string; id: string }>;
}
interface AdminQueryServiceInterface {
  LoginAdmin: (
    email: string,
    password: string
  ) => Promise<{ accessToken: string }>;
}

export type {
  AdminRepositoryInterface,
  AdminCommandServiceInterface,
  AdminQueryServiceInterface,
};
