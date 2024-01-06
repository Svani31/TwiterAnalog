"use client";
import Button from "@/app/HOC/button";
import { useStore } from "@/app/libs/useStore";
import React, { useState } from "react";
import Register from "../registerpop/page";
import SignIn from "../signinpop/page";

export default function LandingPage() {
  const {
    openButtonHandler,
    setIsRegisterOpen,
    isRegisterOpen,
    isSignInOpen,
    setIsSignInOpen,
  } = useStore();

  const onClickHandler = () => {
    console.log("FGHf");
  };

  return (
    <div
      style={
        isRegisterOpen || isSignInOpen
          ? { background: "rgba(91, 112, 131, 0.4)" }
          : { background: "black" }
      }
      className="flex justify-center items-center h-screen m-auto gap-40"
    >
      {/* logo */}
      <div>
        <svg style={{ width: "350px", height: "350px" }} viewBox="0 0 30 30">
          <path
            style={{ fill: "white" }}
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </div>
      {/* Reg / Login */}
      <div>
        <div className="flex flex-col text-start gap-5">
          <h1 className=" text-6xl font-bold mb-8">Happening now</h1>
          <span className="text-2xl font-bold">Join today.</span>
          <div
            style={{ background: "white", color: "black", maxWidth: "380px" }}
            className="rounded-3xl p-2 justify-center flex cursor-pointer"
          >
            <Button text="Gmail" style={"outline-none"} />
          </div>
          <div className="flex flex-row text-center items-center">
            <span
              style={{ background: "white", height: "2px", width: "175px" }}
            ></span>
            <span className="p-2">or</span>
            <span
              style={{ background: "white", height: "2px", width: "175px" }}
            ></span>
          </div>
          <div
            onClick={() =>
              openButtonHandler(setIsRegisterOpen, !isRegisterOpen)
            }
            style={{ background: "rgb(29, 155, 240)", maxWidth: "380px" }}
            className="rounded-3xl p-2 justify-center flex cursor-pointer"
          >
            <Button text="Create Account" style={"outline-none"} />
          </div>
          <span style={{ maxWidth: "360px", fontSize: "12px" }}>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </span>
          <h1 className="font-bold text-1xl">Already have an account?</h1>
          <div
            onClick={() => openButtonHandler(setIsSignInOpen, !isSignInOpen)}
            style={{ maxWidth: "380px" }}
            className="border-2 rounded-3xl p-2 justify-center flex cursor-pointer text-blue-500 ease-in duration-300 font-bold hover:bg-blue-100"
          >
            <Button text="Sign in" style={"outline-none"} />
          </div>
        </div>
      </div>
      {isRegisterOpen ? <Register /> : ""}
      {isSignInOpen ? <SignIn /> : ""}
    </div>
  );
}
