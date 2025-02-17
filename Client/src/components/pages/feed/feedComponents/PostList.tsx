import { Post as PostTypes } from "../../../../types/PostTypes";
import PostCard from "../../../UI/organism/PostCard";

const PostList = ({ posts }: { posts: PostTypes[] }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
