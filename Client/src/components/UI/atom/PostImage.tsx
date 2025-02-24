type PostImageProps = {
  src: string;
  alt: string;
};

const PostImage = ({ src, alt }: PostImageProps) => {
  return (
    <img src={src} alt={alt} className="w-full h-auto rounded-lg object-cover max-h-[32rem]" />
  );
};

export default PostImage;
