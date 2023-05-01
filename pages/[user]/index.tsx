import React, { useEffect } from "react";
import Blog from "@/components/Blog";
import { BlogType } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DummyData = [
  {
    title: "The Rise of Blockchain Technology: A Beginner's Guide",
    date: "April 15, 2023",
    description:
      "This blog post provides a comprehensive introduction to blockchain technology, including how it works, its benefits and drawbacks, and its potential applications in various industries. Whether you're a curious beginner or a seasoned expert, this post will give you the knowledge you need to understand one of the most disruptive technologies of our time.",
    likes: 32,
    hashtag: ["#Blockchain", "#Cryptocurrency", "#Decentralization"],
    profile:
      "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo",
    image:
      "https://images.unsplash.com/photo-1639815188546-c43c240ff4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2NrY2hhaW58ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60",
  },
  {
    title: "The Future of Artificial Intelligence in Healthcare",
    date: "May 2, 2023",
    description:
      "In this blog post, we explore the latest developments in artificial intelligence (AI) and their potential impact on healthcare. From improving diagnosis and treatment to revolutionizing drug discovery, AI has the potential to transform the healthcare industry as we know it. Join us as we discuss the latest breakthroughs and explore the ethical implications of this rapidly evolving field.",
    hashtag: ["#AI", "#Healthcare", "#MedicalResearch"],
    likes: 32,
    profile:
      "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo",
    image:"https://plus.unsplash.com/premium_photo-1677094310918-cc302203b21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YWl8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"},
  {
    title: "The Power of 5G Networks: How They Will Change the Way We Connect",
    date: "June 1, 2023",
    description:
      "In this post, we take a closer look at the latest advances in 5G technology and explore how they will revolutionize the way we connect with each other and the world around us. From faster speeds to lower latency, 5G networks are poised to transform everything from autonomous vehicles to virtual reality experiences. Join us as we explore the potential of this game-changing technology.",
    hashtag: ["#5G", "#Connectivity", "#InternetOfThings"],
    likes: 32,
    profile:
      "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo",
    image:"https://images.unsplash.com/photo-1520869562399-e772f042f422?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmV0d29ya3xlbnwwfDB8MHx8&auto=format&fit=crop&w=900&q=60"},
  {
    title: "The Emergence of Quantum Computing: What You Need to Know",
    date: "July 15, 2023",
    description:
      "This blog post offers a primer on quantum computing, one of the most promising new technologies on the horizon. From the basics of quantum mechanics to the potential of quantum computers to revolutionize fields as diverse as cryptography and drug discovery, we explore the ins and outs of this fascinating field.",
    hashtag: ["#QuantumComputing", "#QuantumMechanics", "#Cryptography"],
    likes: 32,
    profile:
      "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo",
    image:"https://images.unsplash.com/photo-1667984390527-850f63192709?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHF1YW50dW0lMjBjb21wdXRpbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"},
  {
    title:
      "The Promise of Augmented Reality: How It's Changing the Way We Experience the World",
    date: "August 10, 2023",
    description:
      "In this post, we take a look at the latest developments in augmented reality (AR) and their potential to transform the way we interact with our surroundings. From enhancing gaming and entertainment experiences to improving industrial design and healthcare, AR is opening up new possibilities for businesses and consumers alike. Join us as we explore the promise of this exciting technology.",
    hashtag: ["#AugmentedReality", "#VirtualReality", "#DigitalTransformation"],
    likes: 32,
    profile:
      "https://lh3.googleusercontent.com/ogw/AAEL6shNSfYDplMrKLHB_7kT5CJxrm7pXvSLB0uRHu32j8g=s64-c-mo",
    image:"https://images.unsplash.com/photo-1554474051-0256b98c36f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF1Z21lbnRlZCUyMHJlYWxpdHl8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"},
];

interface HomeProps {
  blogs: BlogType[]
}

const Home = ({blogs}: HomeProps) => {

  const {status, data} = useSession();
  const router = useRouter();

  useEffect(() => {
    if(status === "authenticated") router.replace(`/${data.user?.email}`)
    else if(status === "unauthenticated") router.replace('/guest')
  }, [data?.user?.email!]);

  return (
    <div className="w-full relative flex flex-col min-h-screen pb-16 pt-24 gap-5">
      {blogs.map((item, index) => (
        <Blog
          _id={item._id}
          key={`blog${index}`}
          index={index}
          title={item.title!}
          date={item.date!}
          description={item.blog!}
          likes={item.likes!}
          hashtag={item.tags!}
          profile={item.profileImage!}
          likeCount={item.likeCount!}
          image={item.image!}
        />
      ))}
    </div>
  );
};

// GET PROPS FOR SERVER SIDE RENDERING
export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(`${process.env.API_URL}/blog`)
  const blogs = await res.json()

  // return props
  return {
    props: { blogs },
  }
}

export default Home;
