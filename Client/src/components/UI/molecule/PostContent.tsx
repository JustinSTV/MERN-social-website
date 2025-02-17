type PostContentProps = {
  content: string;
};

const PostContent = ({ content }: PostContentProps) => {
  return <p className="text-secondary-100 break-words">{content}</p>;
};

export default PostContent;
