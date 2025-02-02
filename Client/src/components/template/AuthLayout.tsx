import { ReactNode } from "react";
import Logo from "../UI/molecule/Logo";

type AuthLayoutType = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutType) => {
  return (
    <section className="min-h-screen flex items-center justify-evenly gap-20">
      <Logo size="xl" />
      <div className="w-full max-w-md p-6">{children}</div>
    </section>
  );
};

export default AuthLayout;
