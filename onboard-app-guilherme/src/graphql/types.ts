export interface LoginResponse {
  login: {
    token: string;
  };
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UsersQueryResponse {
  users: {
    nodes: User[];
  };
}
