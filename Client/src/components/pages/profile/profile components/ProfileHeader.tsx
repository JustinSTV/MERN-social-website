import { useState } from "react";
import { User, EditProfileData } from "../../../../types/UserTypes";
import { useUserContext } from "../../../../context/User/useUserContext";

import EditProfileModal from "./EditProfileModal";
import ProfileImage from "../../../UI/atom/ProfileImage";
import CoverPhoto from "../../../UI/molecule/CoverPhoto";

type ProfileHeaderProps = {
  user: User | null;
  isOwnProfile: boolean;
};
const ProfileHeader = ({ isOwnProfile }: ProfileHeaderProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { updateProfile, updateProfileImage, updateCoverImage, state } = useUserContext();
  const { user } = state;

  const handleEditProfile = async (values: EditProfileData) => {
    if (user) {
      await updateProfile(user._id, values);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      await updateProfileImage(user._id, file);
    }
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      await updateCoverImage(user._id, file);
    }
  };

  if (!user) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-20 bg-secondary-800 rounded-lg">
        <header className="relative h-48 bg-secondary-600 rounded-t-lg">
          <CoverPhoto
            coverUrl={user.coverPicture}
            isOwnProfile={isOwnProfile}
            handleCoverUpload={handleCoverUpload}
          />
          <div className="absolute -bottom-16 left-8">
            <div className=" rounded-full border-4 border-secondary-900 bg-secondary-700">
              <ProfileImage
                imageUrl={user.profileImage}
                alt={`${user.firstName} ${user.lastName} profile picture`}
                size="md"
              />
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
              handleEditProfile={handleEditProfile}
              handleImageUpload={handleImageUpload}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
