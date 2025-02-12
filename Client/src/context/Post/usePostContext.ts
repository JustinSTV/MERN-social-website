import { useContext } from "react";
import { PostContext } from "./PostContext";
import { PostContextTypes } from "../../types/PostTypes";

export const usePostContext = (): PostContextTypes => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
