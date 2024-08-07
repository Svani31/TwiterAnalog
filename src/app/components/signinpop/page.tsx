"use client";
import Button from "@/app/HOC/button";
import { useStore } from "@/app/utils/myContext";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SignIn() {
  const { isSignInOpen, setIsSignInOpen } = useStore();
  const [userSignIn, setUserSignIn] = useState({ name: "", password: "" });
  const route = useRouter()

  const signInHandler = async () => {
    console.log(userSignIn,"this is")
    const signToUser = await signIn("credentials", {
      redirect: false,
      name: userSignIn.name,
      password: userSignIn.password,
    });
    console.log(signToUser)
    if(signToUser?.ok){
      route.push("components/main")
    }else{
      throw alert("Wrong")
    }
  };

  const inputHandler = (e: any) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userSignIn);
  };

  return (
    <div className="absolute bg-black rounded-xl">
      <div className="pl-20 pr-20 pt-3 pb-6">
        <span
          onClick={() => setIsSignInOpen(!isSignInOpen)}
          style={{ position: "absolute", left: "25px", top: "13px" }}
          className="text-bold text-xl w-8 flex text-center items-center justify-center align-middle h-8 rounded-full hover:bg-slate-500 ease-in duration-300"
        >
          X
        </span>
        <div className="flex flex-col max-w-96 mt-9 gap-6">
          <h1 className="text-3xl font-bold flex text-center justify-start">
            Sign in to X
          </h1>
          <div className="bg-white border-2 text-black font-bold flex justify-center p-1 mt-4 cursor-pointer rounded-2xl">
            <Button text="Sign In With Gmail" style={""} />
          </div>
          <div className="flex flex-row text-center items-center">
            <span
              className=" bg-gray-500"
              style={{ height: "2px", width: "175px" }}
            ></span>
            <span className="p-2">or</span>
            <span
              className=" bg-gray-500"
              style={{ height: "2px", width: "175px" }}
            ></span>
          </div>
          <div className="p-3 rounded border-2 border-gray-600">
            <input
              className="w-full outline-none bg-transparent text-white placeholder:text-gray-600"
              name="name"
              type="text"
              placeholder="Name"
              onChange={inputHandler}
            />
          </div>
          <div className="p-3 rounded border-2 border-gray-600">
            <input
              className="w-full outline-none bg-transparent text-white placeholder:text-gray-600"
              name="password"
              type="password"
              placeholder="Password"
              onChange={inputHandler}
            />
          </div>
        </div>

        <div
          onClick={() => signInHandler()}
          className="bg-white text-black font-bold flex justify-center p-1 mt-8 cursor-pointer rounded-2xl"
        >
          <Button text="Next" style={""} />
        </div>
        <div className=" border-2 text-white font-bold flex justify-center p-1 mt-4 cursor-pointer rounded-2xl">
          <Button text="Forgot Password?" style={""} />
        </div>
        <span className="mt-6 flex">Dont have an account? Sign up</span>
      </div>
    </div>
  );
}

export default SignIn;
