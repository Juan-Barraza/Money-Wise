
export interface IUser {
  id: number;
  name: string;
  last_name: string;
  email: string;
}


export interface RegisterUserRequest {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string;
  user: IUser;
}


