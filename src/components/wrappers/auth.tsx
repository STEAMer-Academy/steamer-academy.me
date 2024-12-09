import dynamic from "next/dynamic";

const AuthLayout = dynamic(() =>
  import("@/components/auth/auth-layout").then((mod) => mod.AuthLayout),
);

export default AuthLayout;
