import React from "react";
import Navbar from "./Navbar";
import { ScriptProps } from "next/script";
import { useRouter } from "next/router";


const Layout: React.FC<ScriptProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className={`w-screen flex justify-center ${router.pathname !== "/_error"?"bg-slate-200":"bg-black"}`}>
      <div className={router.pathname!=='/auth/signin'?"relative lg:w-5/6 xl:w-4/6 flex flex-col items-center":""}>
        {router.pathname!=='/auth/signin' &&router.pathname !== "/_error"&&<Navbar />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
