interface AdminRepositoryInterface {
  GetAdmin: (userName: string, password: string) => {};
  CreateAdmin: (userName: string, password: string) => {};
}

interface AdminCommandServiceInterface {
  CreateAdmin: (userName: string, password: string) => {};
}

interface AdminQueryServiceInterface {
  GetAdmin: (userName: string, password: string) => {};
}

export type {
  AdminRepositoryInterface,
  AdminCommandServiceInterface,
  AdminQueryServiceInterface,
};
