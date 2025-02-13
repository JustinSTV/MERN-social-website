import { createContext, useReducer } from "react";
import { initialState, PostContextTypes } from "../../types/PostTypes";
import postReducer from "./PostReducer";

type ChildProps = { children: React.ReactElement };

export const PostContext = createContext<PostContextTypes | undefined>(undefined);

export const PostProvider = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    try {
      dispatch({ type: "GET_POSTS_START" });

      const token = localStorage.getItem("token");

      const res = await fetch("/api/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log(data.posts);

      dispatch({ type: "GET_POSTS_SUCCESS", payload: data.posts });
      return true;
    } catch (error) {
      dispatch({
        type: "CREATE_POST_FAILURE",
        payload: error instanceof Error ? error.message : "Failed to create post",
      });
      return false;
    }
  };

  return (
    <PostContext.Provider
      value={{
        state,
        getPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
