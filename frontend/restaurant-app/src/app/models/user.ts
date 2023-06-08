export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  WAITER = "WAITER",
  CHEF = "CHEF",
  CLIENT = "CLIENT",
  MANAGER = "MANAGER"
}
