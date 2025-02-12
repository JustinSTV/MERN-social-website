import { createContext, useReducer } from "react";
import { initialState, PostContextTypes } from "../../types/PostTypes";
import postReducer from "./PostReducer";

type ChildProps = { children: React.ReactElement };

export const PostContext = createContext<PostContextTypes | undefined>(undefined);

export const PostProvider = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider
      value={{
        state,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
