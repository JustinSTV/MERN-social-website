import { useContext } from "react";
import { UserContext } from "./UserContext";
import { UserContextTypes } from "../../types/UserTypes";

export const useUserContext = (): UserContextTypes => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};