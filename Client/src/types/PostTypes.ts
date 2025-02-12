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
