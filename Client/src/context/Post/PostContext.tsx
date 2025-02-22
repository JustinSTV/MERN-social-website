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

      dispatch({ type: "GET_POSTS_SUCCESS", payload: data.posts });
      return true;
    } catch (error) {
      dispatch({
        type: "CREATE_POST_FAILURE",
        payload: error instanceof Error ? error.message : "Failed to fetch post",
      });
      return false;
    }
  };

  const createPosts = async (content: string) => {
    try {
      dispatch({ type: "CREATE_POST_START" });

      const token = localStorage.getItem("token");
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: "CREATE_POST_SUCCESS",
        payload: data.post,
      });
      return true;
    } catch (error) {
      dispatch({
        type: "CREATE_POST_FAILURE",
        payload: error instanceof Error ? error.message : "Failed to create Post",
      });
      return false;
    }
  };

  const likePost = async (postId: string) => {
    try {
      dispatch({ type: "LIKE_POST_START" });

      const token = localStorage.getItem("token");
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      dispatch({
        type: "LIKE_POST_SUCCESS",
        payload: { postId, userId: data.userId },
      });
      return true;
    } catch (error) {
      dispatch({
        type: "LIKE_POST_FAILURE",
        payload: error instanceof Error ? error.message : "Failed to like Post",
      });
      return false;
    }
  };

  return (
    <PostContext.Provider
      value={{
        state,
        getPosts,
        createPosts,
        likePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
