export type PostContextTypes = {
  state: PostState;
};

export type Post = {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  content: string;
  media?: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
};

export type Comment = {
  _id: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  content: string;
  createdAt: Date;
};

export type PostState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  success: string | null;
};

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  success: null,
};

export type PostActionTypes =
  | { type: "CREATE_POST_START" }
  | { type: "CREATE_POST_SUCCESS"; payload: Post }
  | { type: "CREATE_POST_FAILURE"; payload: string }
  | { type: "GET_POSTS_START" }
  | { type: "GET_POSTS_SUCCESS"; payload: Post[] }
  | { type: "GET_POSTS_FAILURE"; payload: string };
