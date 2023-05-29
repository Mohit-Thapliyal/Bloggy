import dateConverter from "@/utils/dateConverter";
import { BlogType } from "@/utils/types";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillWarning,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const DummyData = {
  title: "The Rise of Blockchain Technology: A Beginner's Guide",
  date: "April 15, 2023",
  description: [
    "Blockchain technology is a digital ledger that is used to record transactions and is immutable, secure, and transparent. The blockchain technology first emerged in 2008 with the introduction of Bitcoin, the first decentralized digital currency. Since then, it has evolved to become a versatile technology with numerous applications across various industries.",
    "One of the significant benefits of blockchain technology is that it enables secure and transparent transactions without the need for intermediaries. This means that it can help reduce costs and improve efficiency in industries such as finance, supply chain management, and real estate.",
    "Moreover, blockchain technology offers an opportunity to solve some of the pressing problems faced by society, such as identity theft and fraud. With blockchain-based systems, individuals and organizations can maintain their identity and data securely and share it only with authorized parties.",
    "Despite its numerous advantages, blockchain technology is not without its drawbacks. One of the primary concerns is the energy consumption associated with its operations. Also, there are concerns about scalability and the potential for the concentration of power among a few large entities.",
    "Overall, blockchain technology is a promising technology that is likely to have a significant impact on various industries in the years to come.",
  ],
  likes: [""],
  likeCount: 22,
  tag: ["#Blockchain", "#Cryptocurrency", "#Decentralization"],
  profile:
    "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo",
  image:
    "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80",
  name: "Mohit Thapliyal",
};

// interface BlogProp {
//   url: string;
// }

const Blog = () => {
  const [liked, setLiked] = useState(false);
  const [blog, setBlog] = useState<BlogType>();
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const blogId = router.query.blog;
  const url = process.env.NEXT_PUBLIC_API_URL;

  const loadBlog = useCallback(async () => {
    setloading(true);
    if(blogId){
      const res = await fetch(`${url}/blog/${blogId}`);
      const blog = await res.json();
      setloading(false);
      setBlog(blog);
    }
  }, [blogId, url]);

  useEffect(() => {
    loadBlog();
  }, [loadBlog]);

  return (
    <>
    <Head>
      <title>{`${blog?.title?.slice(0,25).trim()}...`}</title>
    </Head>
    <div className="w-full relative flex flex-col min-h-screen py-20 gap-5 px-1">
      <div className="flex flex-col gap-5 bg-white p-5 rounded-xl shadow-md">
        {!loading && blog && (
          <>
            <div className="w-full relative group">
              <Image
                src={blog.image!}
                width={1000}
                height={1000}
                priority
                alt="image"
                className="object-cover h-72 w-full rounded-lg"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 rounded-lg group-hover:bg-black/20">
                <div className="absolute gap-2 items-center bottom-3 right-3 hidden group-hover:flex">
                  <p className="text-white text-sm">{blog.userName}</p>
                  <div className="border-2 border-white rounded-full shadow-md cursor-pointer">
                    <Image
                      src={blog.profileImage!}
                      width={1000}
                      height={1000}
                      alt="image"
                      className="object-cover h-8 w-8 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-semibold">{blog.title}</h1>
                  <h3 className="text-slate-500">{dateConverter(blog.date!)}</h3>
                </div>
                <div className="flex flex-col items-center self-start">
                  <span
                    className="text-2xl cursor-pointer text-red-500"
                    onClick={() => setLiked(!liked)}
                  >
                    {liked ? <AiFillHeart className="" /> : <AiOutlineHeart />}
                  </span>
                  <span className="text-sm font-medium">{blog.likeCount}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2 text-slate-700 [word-spacing:3px]">
                {blog.blog &&
                  blog.blog.map((item, index) => (
                    <p key={`para${index}`} className="text-justify">
                      {item}
                    </p>
                  ))}
              </div>
              <div className="flex gap-3 text-sm text-gray-800 mt-4">
                {blog.tags &&
                  blog.tags.map((item, index) => (
                    <span
                      key={`hash${index}`}
                      className="px-3 py-1 rounded-md text-white font-medium bg-orange-400"
                    >
                      #{item}
                    </span>
                  ))}
              </div>
            </div>
          </>
        )}
        {!loading && !blog && (
          <h3 className="flex gap-2 mx-auto items-center">
            No such blog found <AiFillWarning className="text-xl" />
          </h3>
        )}
        {loading && (
          <h3 className="flex gap-2 mx-auto items-center">
            <AiOutlineLoading3Quarters className="text-2xl text-slate-500 animate-spin duration-200" />
          </h3>
        )}
      </div>
    </div>
    </>
  );
};

export default Blog;
