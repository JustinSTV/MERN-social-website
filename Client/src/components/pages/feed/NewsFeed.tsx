import { useQuery } from "@tanstack/react-query";

import { usePostContext } from "../../../context/Post/usePostContext";
import CreatePostForm from "./feedComponents/CreatePostForm";
import PostList from "./feedComponents/PostList";

const NewsFeed = () => {
  const { getPosts, state } = usePostContext();

  const { isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error loading posts</div>;
  }

  return (
    <main className="container mx-auto px-4">
      <section className="max-w-2xl mx-auto space-y-4 py-4">
        <CreatePostForm />
        <PostList posts={state.posts} />
      </section>
    </main>
  );
};

export default NewsFeed;
