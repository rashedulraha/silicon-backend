export interface ILoginPayload {
  email?: string;
  password?: string;
}

export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  success: boolean;
  message?: string;
  user?: IAuthUser;
  token?: string;
}
