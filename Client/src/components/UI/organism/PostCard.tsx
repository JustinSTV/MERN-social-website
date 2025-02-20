import { Post as PostType } from "../../../types/PostTypes";
import PostHeader from "../molecule/PostHeader";
import PostContent from "../molecule/PostContent";

type PostProps = {
  post: PostType;
};

const PostCard = ({ post }: PostProps) => {
  return (
    <article
      className="
      bg-secondary-800 p-6 space-y-4 
        border border-secondary-600/50 rounded-lg shadow-lg
      shadow-black/20 hover:shadow-xl hover:shadow-black/30 
        transition-all duration-300"
    >
      <PostHeader author={post.author} createdAt={post.createdAt} />
      <PostContent content={post.content} />
    </article>
  );
};

export default PostCard;
