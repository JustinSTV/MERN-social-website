type ProfileImageProps = {
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
  alt: string;
};

const ProfileImage = ({ imageUrl, size = "md", alt }: ProfileImageProps) => {
  const sizeClass = {
    sm: "w-10 h-10",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  return (
    <div className={`${sizeClass[size]} rounded-full overflow-hidden bg-secondary-700`}>
      {imageUrl ? <img src={imageUrl} alt={alt} className="w-full h-full object-cover" /> : null}
    </div>
  );
};

export default ProfileImage;
