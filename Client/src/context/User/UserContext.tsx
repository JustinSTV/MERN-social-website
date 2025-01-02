import { createContext, useReducer } from 'react';
import { initialState, UserContextTypes } from '../../types/UserTypes';
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

  return(
    <UserContext.Provider
      value={{
        state,
        login
      }}
    >
      { children }
    </UserContext.Provider>
  );
};





