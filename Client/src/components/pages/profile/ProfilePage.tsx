import { useParams } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";
import ProfileHeader from "./profile components/ProfileHeader";
import ProfileAboutSection from "./profile components/ProfileAboutSection";
import ProfileFriendsSection from "./profile components/ProfileFriendsSection";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { state } = useUserContext();

  const isOwnProfile = state.user?._id === userId;

  return (
    <main className="container mx-auto px-4">
      <div className="grid grid-cols-3 gap-6">
        <section className="col-span-2 mt-4">
          <ProfileHeader user={state.user} isOwnProfile={isOwnProfile} />
          <ProfileAboutSection bio={state.user?.bio} />
        </section>
        <section className="bg-secondary-800 rounded-lg p-6 h-fit mt-4">
          <ProfileFriendsSection />
        </section>
      </div>
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
