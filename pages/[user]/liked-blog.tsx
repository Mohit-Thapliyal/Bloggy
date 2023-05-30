import LoginPrompt from "@/components/LoginPrompt";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const LikedBlog = () => {
  const { status } = useSession();
  if (status !== "authenticated") return <LoginPrompt />;
  return (
    <>
      <Head>
        <title>Liked Blog</title>
      </Head>
      <div className="w-full relative flex flex-col min-h-screen py-20 gap-5"></div>
    </>
  );
};

export default LikedBlog;
