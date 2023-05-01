import Image from "next/image";
import loginImage from "../../public/login.png";
import signinImage from "../../public/signin.png";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  AiFillDelete,
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { LoginCredentialsType, SignupCredentialsType } from "@/utils/types";

const defaultSignupCredential = {
  userID: "",
  password: "",
  userName: "",
  blogs: [],
  likes: [],
  date: 0,
  profileImage: "",
};

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { status, data } = useSession();
  const [loginCredentials, setloginCredentials] =
    useState<LoginCredentialsType>({ userID: "", password: "" });
  const [invalidCredential, setInvalidCredential] = useState(false);
  const [login, setLogin] = useState(true);

  const [signUpCredentials, setSignUpCredentials] =
    useState<SignupCredentialsType>(defaultSignupCredential);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const loginHandler = async () => {
    if (loginCredentials.userID !== "" && loginCredentials.password !== "") {
      const res = await signIn("credentials", {
        userID: loginCredentials.userID,
        password: loginCredentials.password,
        redirect: false,
      });
      console.log(res);
      if (res?.status === 401) {
        setInvalidCredential(true);
      } else {
        setInvalidCredential(false);
        router.replace(`/${data?.user?.email}`);
      }
    } else {
      alert("Please fill in details correctly!");
    }
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", selectedImage as Blob);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    return res2.url;
  };

  const signinHandler = async () => {
    setLoading(true);
    const imageURL = await uploadImage();
    let data: SignupCredentialsType = defaultSignupCredential;

    data = {
      userID: signUpCredentials.userID,
      userName: signUpCredentials.userName,
      password: signUpCredentials.password,
      blogs: [],
      likes: [],
      date: Date.now(),
      profileImage: imageURL ? imageURL : "null",
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoading(false);
    setSignUpCredentials(defaultSignupCredential);
    setConfirmPassword("");
    setLogin(true);
    console.log(res);
  };

  if (loading)
    return (
      <div className="flex relative min-h-screen">
        <div className="flex gap-2 mx-auto items-center">
          <h1 className="bg-white flex gap-3 items-center px-4 py-2 rounded-md">
            Loading
            <AiOutlineLoading3Quarters className="text-xl text-slate-500 animate-spin duration-200" />
          </h1>
        </div>
      </div>
    );

  if (login)
    return (
      <div className="flex relative min-h-screen">
        <div className="w-5/12 flex justify-center items-center bg-slate-200 px-10 top-0 bottom-0">
          <div className="bg-white shadow-md rounded-lg p-10 xl:p-14">
            <div className="flex flex-col gap-1 xl:gap-2">
              <div className="w-fit mx-auto text-xl">Welcome back</div>
              {/* <div className="text-center py-2 rounded-md border mt-2">
                Log in with Google
              </div>
              <div className="flex items-center gap-2 my-4">
                <div className="flex-grow h-[0.5px] bg-slate-300"></div>
                <div className="text-sm font-light text-slate-500">or</div>
                <div className="flex-grow h-[0.5px] bg-slate-300"></div>
              </div> */}
              <div className="flex gap-1 flex-col">
                <label className="text-sm" htmlFor="">
                  User Id
                </label>
                <input
                  value={loginCredentials.userID}
                  onChange={(e) => {
                    loginCredentials.userID = e.target.value;
                    setloginCredentials({ ...loginCredentials });
                  }}
                  className="border-b py-1 w-60 xl:w-72 focus:border-b-black placeholder:font-light placeholder:text-sm text-slate-700 outline-none"
                  placeholder="Enter your user id"
                  type="text"
                />
              </div>
              <div className="flex gap-1 flex-col">
                <label className="text-sm" htmlFor="">
                  Password
                </label>
                <input
                  value={loginCredentials.password}
                  onChange={(e) => {
                    loginCredentials.password = e.target.value;
                    setloginCredentials({ ...loginCredentials });
                  }}
                  className="border-b py-1 w-60 xl:w-72 focus:border-b-black placeholder:font-light placeholder:text-sm outline-none"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              <button
                onClick={loginHandler}
                className="bg-black p-2 mt-5 text-white rounded-md"
              >
                Login
              </button>
              <p className="text-slate-500 text-xs w-fit mx-auto mt-1">
                Don&apos;t have an accout?{" "}
                <span
                  onClick={() => setLogin(false)}
                  className="text-black font-medium cursor-pointer"
                >
                  Sign up for free
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-7/12 relative top-0 p-20 xl:px-32 border-l-2 border-slate-300 bottom-0 bg-slate-200 flex items-center justify-center">
          <Image
            className="absolute top-0 bottom-0 object-cover blur-sm h-full"
            src={loginImage}
            priority
            alt="Welcome"
          />
          <div className="z-10 bg-white/70 rounded-md shadow-md backdrop-blur-md p-10">
            <h1 className="text-3xl text-slate-800">
              Welcome to <span className="font-semibold">Bloggy</span>,<br />{" "}
              where every word counts!
            </h1>
            <div className="mt-5 text-slate-600">
              Join our community of passionate writers and readers to share your
              thoughts, ideas, and experiences with the world. Login now and
              start your journey towards becoming a better writer!
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex relative min-h-screen">
      <div className="w-5/12 relative top-0 p-10 border-r-2 border-slate-300 bottom-0 bg-slate-200 flex items-center justify-center">
        <Image
          className="absolute top-0 bottom-0 object-cover h-full"
          src={signinImage}
          priority
          alt="Welcome"
        />
        <div className="z-10 bg-white/70 rounded-md shadow-md backdrop-blur-md p-10">
          <h1 className="text-3xl text-slate-800">
            Welcome to <span className="font-semibold">Bloggy</span>,<br />{" "}
            where every word counts!
          </h1>
          <div className="mt-5 text-slate-600">
            Join our community of passionate writers and readers to share your
            thoughts, ideas, and experiences with the world. Login now and start
            your journey towards becoming a better writer!
          </div>
        </div>
      </div>
      <div className="w-7/12 flex justify-center items-center bg-slate-200 px-10 top-0 bottom-0">
        <div className="bg-white flex flex-col p-10 rounded-lg gap-4">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 text-sm items-center">
              <div className="col-span-5 flex-grow w-52 bg-slate-200 rounded-lg p-2">
                {selectedImage ? (
                  <div className="flex relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      alt="not found"
                      width={500}
                      height={500}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <span
                      className="absolute bottom-3 right-3 p-2 bg-white rounded-full cursor-pointer hover:bg-rose-500 duration-150 text hover:text-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      <AiFillDelete />
                    </span>
                  </div>
                ) : (
                  <label
                    htmlFor="upload-image"
                    className="w-full h-full bg-pink-500 cursor-pointer"
                  >
                    <div className="h-full w-full rounded-lg border-dashed border-2 border-slate-400 flex justify-center items-center">
                      <div className="flex flex-col items-center text-slate-500">
                        <AiOutlineCloudUpload className="text-2xl" />
                        <span className="text-sm">Click to upload</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={(event) => {
                        if (event.target.files !== null) {
                          setSelectedImage(event.target.files[0]);
                        }
                      }}
                      name=""
                      id="upload-image"
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <span className="w-full text-center bg-slate-200 rounded-md p-1">
                Add Profile Pic
              </span>
            </div>
            <div className="w-[1px] bg-gray-300 self-stretch" />
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  Full Name
                </label>
                <input
                  value={signUpCredentials.userName}
                  onChange={(e) => {
                    signUpCredentials.userName = e.target.value;
                    setSignUpCredentials({ ...signUpCredentials });
                  }}
                  className="border-b py-1 w-60 xl:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm text-slate-700 outline-none"
                  placeholder="John Morey"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  User Id
                </label>
                <input
                  value={signUpCredentials.userID}
                  onChange={(e) => {
                    signUpCredentials.userID = e.target.value;
                    setSignUpCredentials({ ...signUpCredentials });
                  }}
                  className="border-b py-1 w-60 xl:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm text-slate-700 outline-none"
                  placeholder="John23_morey"
                  type="text"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  Password
                </label>
                <input
                  value={signUpCredentials.password}
                  onChange={(e) => {
                    signUpCredentials.password = e.target.value;
                    setSignUpCredentials({ ...signUpCredentials });
                  }}
                  className="border-b py-1 w-60 xl:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm outline-none"
                  placeholder="yl@LJ_4349503"
                  type="password"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="">
                  Confirm password
                </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="border-b py-1 w-60 xl:w-60 focus:border-b-black placeholder:font-light placeholder:text-sm outline-none"
                  placeholder="yl@LJ_4349503"
                  type="password"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={signinHandler}
              className="bg-black p-2 mt-5 text-white rounded-md"
            >
              Signup
            </button>
            <p className="text-slate-500 text-xs w-fit mx-auto mt-1">
              Already have an accout?{" "}
              <span
                onClick={() => setLogin(true)}
                className="text-black font-medium cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
