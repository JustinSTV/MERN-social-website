import { useEffect } from "react";
import { usePostContext } from "../../../context/Post/usePostContext";
import ProfileImage from "../../UI/atom/ProfileImage";

const NewsFeed = () => {
  const { getPosts, state } = usePostContext();

  console.log("Current posts state:", state.posts);

  useEffect(() => {
    setInterval(() => {
      getPosts();
      console.log("fetching post");
    }, 30000);
  }, []);

  return (
    <main className="container mx-auto px-4">
      <section className="max-w-2xl mx-auto space-y-4 py-4">
        {state.posts.map((post) => (
          <article key={post._id} className="bg-secondary-800 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <ProfileImage
                imageUrl={post.author.profileImage}
                alt={post.author.firstName}
                size={"sm"}
              />
              <div>
                <h3 className="font-semibold">
                  {post.author.firstName} {post.author.lastName}
                </h3>
                <p className="text-sm text-secondary-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-secondary-100">{post.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default NewsFeed;
