import { createContext, useReducer } from 'react';
import { initialState, UserContextTypes, User, RegisterData } from '../../types/UserTypes';
import userReducer from './UserReducer';

type ChildProps = { children: React.ReactElement };


export const UserContext = createContext<UserContextTypes | undefined>(undefined);

export const UserProvider = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try{
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      return true;
    } catch(error){
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error instanceof Error ? error.message : "Login failed"
      });
      return false;
    }
  };

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'REGISTER_START' });
    try{
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await res.json();
      console.log(data)

      if(!res.ok){
        throw new Error(data.message)
      };

      localStorage.setItem('token', data.token);
      dispatch({ 
        type: 'REGISTER_SUCCESS',
        payload: data.user
      });
      return true;
    }catch(error){
      dispatch({ 
        type: 'REGISTER_FAILURE' ,
        payload: error instanceof Error ? error.message : "Registration failed"
      });
      return false
    }
  }

  return(
    <UserContext.Provider
      value={{
        state,
        login,
        register
      }}
    >
      { children }
    </UserContext.Provider>
  );
};





