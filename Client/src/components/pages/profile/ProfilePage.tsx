import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { state } = useUserContext();

  const isOwnProfile = state.user?._id === userId;

  return (
    <main className="container mx-auto">
      {/* cover photo */}
      <header className="relative h-48 bg-secondary-600">
        <div className="absolute -bottom-16 left-8">
          <div className="w-32 h-32 rounded-full border-4 border-secondary-900 bg-secondary-700">
            {/* Profile photo */}
          </div>
        </div>
      </header>

      {/* profile info */}
      <article className="pt-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {state.user?.firstName} {state.user?.lastName}
            </h1>
            <p className="text-secondary-400">{state.user?.email}</p>
          </div>

          {isOwnProfile ? (
            <button className="px-4 py-2 bg-primary-600 rounded-full hover:bg-primary-700 transition">
              Edit Profile
            </button>
          ) : (
            <button className="px-4 py-2 bg-primary-600 rounded-full hover:bg-primary-700 transition">
              Connect
            </button>
          )}
        </div>

        {/* about */}
        <section className="mt-8 bg-secondary-800 rounded-lg p-6">
          <h2>About</h2>
          <p>{state.user?.bio || "No bio yet"}</p>
        </section>

        {/* Posts */}
        <section className="mt-8 bg-secondary-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          {/* later post will go here  */}
        </section>
      </article>
    </main>
  );
};

export default ProfilePage;

/*TODO:
  profile pic upload
  cover photo
  bio
  friends list
  user post
  edit user profile
 */
