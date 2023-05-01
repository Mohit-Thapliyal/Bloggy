import dateConverter from "@/utils/dateConverter";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


interface BolgProps {
  _id?: string,
  index: number;
  title: string;
  date: number;
  description: string[];
  hashtag: string[];
  likes: string[];
  likeCount: number;
  profile: string;
  image: string;
}

const Blog = ({
  _id,
  index,
  title,
  date,
  description,
  hashtag,
  likes,
  likeCount,
  profile,
  image,
}: BolgProps) => {
  const [liked, setLiked] = useState(false);
  const router = useRouter()
  const user = router.query.user;
  return (
    <div className={`w-full flex items-center relative h-56 p-5 bg-white rounded-3xl shadow-md gap-5 ${index%2?"flex-row-reverse":""}`}>
      <Link href={`/${user}/${_id}`} className=" w-2/6 h-48 relative rounded-2xl">
        <Image
          src={image}
          className="relative w-full h-full object-cover rounded-2xl shadow-xl"
          width={500}
          height={500}
          priority
          alt="blog image"
        />
      </Link>
      <div className="h-full w-full flex flex-col gap-2">
        <div>
          <Link href={`/${user}/${_id}`} className="font-medium hover:text-orange-400">{title.length>40 ? `${title.slice(0,40).trim()}...`: title}</Link>
          <h3 className="text-sm text-slate-500">{dateConverter(date)}</h3>
        </div>
        <div className="text-sm text-slate-600 text-justify pr-10">{description[0].length>200 ? `${description[0].slice(0,200).trim()}...`: description}</div>
        <div className="flex gap-3 text-sm text-gray-800 ">
          {hashtag.map((item, index) => (
            <span
              key={`hash${index}`}
              className="bg-orange-200 py-1 px-2 rounded-md items-center text-slate-500 shadow-sm text-xs"
            >
              #{item}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-1 items-center">
            <span className="text-xl cursor-pointer text-red-500" onClick={()=>setLiked(!liked)}>
              {liked ? (
                <AiFillHeart className="" />
              ) : (
                <AiOutlineHeart />
              )}
            </span>
            <span className="text-sm font-medium">{likeCount}</span>
          </div>
          <div className="w-7 border cursor-pointer rounded-full shadow-lg">
            <Image
              src={profile}
              className="rounded-full"
              alt="profile"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
