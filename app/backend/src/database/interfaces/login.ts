export type LoginBody = {
  email: string;
  password: string;
};

export type LoginReturn = {
  loginReturn: {
    user?: {
      id: number;
      username: string;
      role: string;
      email: string;
    },
    token?: string;
    message?: string;
  },
  Status: number;
};

export type ReturnMessageStatus = {
  message: string;
  status: number;
};

export type RetornoJWT = {
  id: number;
  username: string;
  role: string;
  email: string;
};

export type UserToken = {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  }
  token: string;
};
