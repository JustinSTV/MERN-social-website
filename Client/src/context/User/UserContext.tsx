import { createContext, useState, useReducer } from 'react';
import { UserContextTypes, User, UserState, UserActionTypes } from '../../types/UserTypes';

type ChildProps = { children: React.ReactElement };


export const UserContext = createContext<UserContextTypes | undefined>(undefined);

const userReducer = (state: UserState, action: UserActionTypes): UserState => {

};

export const UserProvider = ({ children }: ChildProps) => {


  return(
    <UserContext.Provider
      value={{

      }}
    >
      { children }
    </UserContext.Provider>
  );
};





