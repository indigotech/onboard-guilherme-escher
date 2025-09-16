export interface LoginResponse {
  login: {
    token: string;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface PageInfo {
  offset: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UsersQueryResponse {
  users: {
    nodes: User[];
    pageInfo: PageInfo;
  };
}

export interface CreateUserResponse {
  createUser: {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: "admin" | "user";
  };
}

export interface CreateUserVariables {
  data: {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    password: string;
    role: "admin" | "user";
  };
}

export interface UserDetailsResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    role: "admin" | "user";
  };
}

export interface UserDetailsVariables {
  id: string;
}
