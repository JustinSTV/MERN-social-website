import { useRef } from "react";

type CoverPhotoProps = {
  coverUrl?: string;
  isOwnProfile?: boolean;
  handleCoverUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const CoverPhoto = ({ coverUrl, isOwnProfile, handleCoverUpload }: CoverPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="w-full h-full bg-secondary-600 rounded-t-lg"
      style={
        coverUrl
          ? {
              backgroundImage: `url(${coverUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {isOwnProfile && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCoverUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-4 right-4 px-4 py-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
          >
            {coverUrl ? "Change Cover" : "Add cover"}
          </button>
        </>
      )}
    </div>
  );
};

export default CoverPhoto;
