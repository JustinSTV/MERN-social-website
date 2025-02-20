import { useQuery } from "@tanstack/react-query";
import { usePostContext } from "../../../../context/Post/usePostContext";
import PostCard from "../../../UI/organism/PostCard";

type ProfilePostsSectionProps = {
  userId: string;
};

const ProfilePostSection = ({ userId }: ProfilePostsSectionProps) => {
  const { state, getPosts } = usePostContext();

  const { isLoading, error } = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getPosts(),
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts</div>;

  const userPosts = state.posts.filter((post) => post.author._id === userId);

  return (
    <section className="mt-8 bg-secondary-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      <div className="space-y-4">
        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default ProfilePostSection;
