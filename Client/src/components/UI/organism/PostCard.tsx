import { Post as PostType } from "../../../types/PostTypes";
import PostHeader from "../molecule/PostHeader";
import PostContent from "../molecule/PostContent";

type PostProps = {
  post: PostType;
};

const PostCard = ({ post }: PostProps) => {
  return (
    <article className="bg-secondary-800 rounded-lg p-6 space-y-4">
      <PostHeader author={post.author} createdAt={post.createdAt} />
      <PostContent content={post.content} />
    </article>
  );
};

export default PostCard;
