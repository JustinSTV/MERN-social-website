import ProfileImage from "../atom/ProfileImage";

type PostHeaderProps = {
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  createdAt: Date;
};

const PostHeader = ({ author, createdAt }: PostHeaderProps) => {
  return (
    <div className="flex items-center gap-3">
      <ProfileImage imageUrl={author.profileImage} alt={author.firstName} size={"sm"} />
      <div>
        <h3 className="font-semibold">
          {author.firstName} {author.lastName}
        </h3>
        <p className="text-sm text-secondary-400">{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PostHeader;
