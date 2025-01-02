import React, { createContext, useEffect, useState} from "react";

type ChildProps = { children: React.ReactElement };

type AuthContextType = {
  isAuthenticated: boolean,
  user: any|null,
  login: (token: string, userData: any) => void,
  logout: () => void
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ChildProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setIsAuthenticated(true)
    }
  }, []);

  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user });
  }, [isAuthenticated, user]);

  const login = (token: string, userData: any) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return(
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

