export type UserContextTypes = {
  state: UserState,
  login: (email: string, password: string) => Promise<boolean>
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  coverPicture?: string;
  bio?: string;
  friends?: string[];
  createdAt?: Date;
};

export type UserState = {
  user: User | null,
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
}

export type UserActionTypes = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' };