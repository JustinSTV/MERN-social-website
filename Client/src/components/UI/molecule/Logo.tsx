import { BsChatSquare } from "react-icons/bs";

type LogoSize = {
  size?: "sm" | "md" | "lg" | "xl";
};

const Logo = ({ size = "lg" }: LogoSize) => {
  const sizeConfig = {
    sm: {
      icon: 24,
      text: "text-xl",
    },
    md: {
      icon: 32,
      text: "text-2xl",
    },
    lg: {
      icon: 40,
      text: "text-4xl",
    },
    xl: {
      icon: 48,
      text: "text-5xl",
    },
  };

  return (
    <div className={`flex items-center gap-2 ${sizeConfig[size].text}`}>
      <BsChatSquare size={sizeConfig[size].icon} />
      <span>YOUnivers</span>
    </div>
  );
};

export default Logo;
