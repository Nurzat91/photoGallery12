export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
}
export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}
export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}
export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
}

export interface PhotoMutation{
  title: string;
  image: File | null;
}
export interface Photo{
  _id: string;
  author: {
    _id: string,
    displayName: string,
  };
  title: string;
  image: string;
}