import { usePostContext } from "../../../context/Post/usePostContext";

const NewsFeed = () => {
  const { getPosts, state } = usePostContext();

  const handleTestFetch = async () => {
    await getPosts();
    console.log("Current posts state:", state.posts);
  };

  return (
    <section>
      <h1>News Feed</h1>
      <button onClick={handleTestFetch}>Test Fetch Posts</button>
    </section>
  );
};

export default NewsFeed;
