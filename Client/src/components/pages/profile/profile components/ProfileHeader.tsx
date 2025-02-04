import { useState } from "react";
import { User } from "../../../../types/UserTypes";
import EditProfileModal from "./EditProfileModal";

type ProfileHeaderProps = {
  user: User | null;
  isOwnProfile: boolean;
};
const ProfileHeader = ({ user, isOwnProfile }: ProfileHeaderProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditProfile = async () => {
    console.log("open");
  };

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <>
      {/* cover photo */}
      <div className="flex flex-col gap-20 bg-secondary-800 rounded-lg">
        <header className="relative h-48 bg-secondary-600 rounded-t-lg">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-secondary-900 bg-secondary-700">
              {/* Profile photo */}
            </div>
          </div>
        </header>
        <div className="flex justify-between items-center px-9 pb-9">
          <div>
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-secondary-400">{user.email}</p>
          </div>

          {isOwnProfile ? (
            <button
              onClick={() => setEditModalOpen(true)}
              className="px-4 py-2 bg-primary-600 rounded-full hover:bg-primary-700 transition"
            >
              Edit Profile
            </button>
          ) : (
            <button className="px-4 py-2 bg-primary-600 rounded-full hover:bg-primary-700 transition">
              Connect
            </button>
          )}
          {user && (
            <EditProfileModal
              user={user}
              isOpen={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              onSubmit={handleEditProfile}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
