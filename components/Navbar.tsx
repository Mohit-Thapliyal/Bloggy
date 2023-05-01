import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Navbar = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const user = router.query.user;
  return (
    <nav className="fixed w-screen py-2 z-20 backdrop-blur-sm bg-slate-200">
      <div className="flex lg:w-5/6 xl:w-4/6 justify-between rounded-xl items-center px-5 py-2 bg-white shadow-md mx-auto">
        <Link
          href={`/${user}/`}
          className="font-semibold text-orange-400 text-lg cursor-pointer"
        >
          Bloggy
        </Link>
        <div className="flex gap-5 text-sm items-center">
          <Link
            href={`/${user}/my-blog`}
            className={`hover:border-b pb-1 font-medium border-orange-400 ${
              router.pathname === "/[user]/my-blog"
                ? "border-b text-orange-400"
                : ""
            }`}
          >
            My blog
          </Link>
          <Link
            href={`/${user}/liked-blog`}
            className={`hover:border-b pb-1 font-medium border-orange-400 ${
              router.pathname === "/[user]/liked-blog"
                ? "border-b text-orange-400"
                : ""
            }`}
          >
            Liked blog
          </Link>
          <Link
            href={`/${user}/create-blog`}
            className={`hover:border-b pb-1 font-medium border-orange-400 ${
              router.pathname === "/[user]/create-blog"
                ? "border-b text-orange-400"
                : ""
            }`}
          >
            Create blog
          </Link>
        </div>
        <div
          onClick={() => {
            status === "authenticated"
              ? confirm("Do you want to log out?")
                ? signOut()
                : null
              : null;
          }}
          className="w-9 h-9 relative border cursor-pointer rounded-full shadow-lg"
        >
          <Image
            src={
              data?.user?.image
                ? data.user.image
                : // "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo"
                  "https://images.unsplash.com/photo-1573676564862-0e57e7eef951?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRleHR1cmUlMjBvcmFuZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
            }
            width={100}
            height={100}
            className="rounded-full object-cover w-full h-full"
            alt="profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
