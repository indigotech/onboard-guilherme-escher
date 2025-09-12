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
