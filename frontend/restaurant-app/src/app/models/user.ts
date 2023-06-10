export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  token?: String;
}

export enum UserRole {
  CLIENT = "CLIENT",
  WAITER = "WAITER",
  CHEF = "CHEF",
  MANAGER = "MANAGER"
}
