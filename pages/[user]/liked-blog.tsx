import Login from '@/components/LoginPrompt';
import { useSession } from 'next-auth/react';
import React from 'react'



const LikedBlog = () => {
  const {status} = useSession();
  if (status !== "authenticated") return <Login />;
  return (
    <div className="w-full relative flex flex-col min-h-screen py-20 gap-5"></div>
  )
}

export default LikedBlog