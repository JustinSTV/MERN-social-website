import { PostState, PostActionTypes } from "../../types/PostTypes";

const postReducer = (state: PostState, action: PostActionTypes) => {
  switch (action.type) {
    case "CREATE_POST_START":
    case "GET_POSTS_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
        error: null,
      };

    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case "CREATE_POST_FAILURE":
    case "GET_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
