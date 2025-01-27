import { ReactNode } from "react";

type AuthLayoutType = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutType) => {
  return (
    <section className="min-h-screen flex items-center justify-center gap-20">
      <h1>YOUnivers</h1>
      <div className="w-full max-w-md p-6">{children}</div>
    </section>
  );
};

export default AuthLayout;
