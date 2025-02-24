import { useUserContext } from "../../../context/User/useUserContext";
import { usePostContext } from "../../../context/Post/usePostContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Post as PostType } from "../../../types/PostTypes";
import PostHeader from "../molecule/PostHeader";
import PostContent from "../molecule/PostContent";
import PostImage from "../atom/PostImage";

type PostProps = {
  post: PostType;
};

const PostCard = ({ post }: PostProps) => {
  const {
    state: { user },
  } = useUserContext();
  const { likePost } = usePostContext();

  const isLiked = user && post.likes.includes(user._id);

  const handleLike = async () => {
    await likePost(post._id);
  };

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
      {post.media && <PostImage src={post.media} alt={post.content} />}
      <div className="flex items-center gap-2">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 text-sm text-secondary-400 hover:text-primary-500 transition-colors"
        >
          {isLiked ? <AiFillHeart className="text-primary-500" /> : <AiOutlineHeart />}
          <span>{post.likes.length}</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
