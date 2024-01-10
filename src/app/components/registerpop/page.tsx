"use client"
import Button from "@/app/HOC/button";
import { useStore } from "@/app/libs/useStore";
import React, { useState } from "react";

function Register() {
  const [registerInput, setRegisterInputs] = useState<RegisterTypes>({
    name: "",
    email: "",
    password: "",
  });
  const { openButtonHandler, setIsRegisterOpen, isRegisterOpen } = useStore();
  const changeHandler = (e: any) => {
    setRegisterInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="absolute bg-black rounded-xl">
      <div className="pl-20 pr-20 pt-3 pb-4">
        <span
          onClick={() => openButtonHandler(setIsRegisterOpen, !isRegisterOpen)}
          style={{ position: "absolute", left: "25px", top: "13px" }}
          className="text-bold text-xl w-8 flex text-center items-center justify-center align-middle h-8 rounded-full hover:bg-slate-500 ease-in duration-300"
        >
          X
        </span>
        <span className="text-xl">Step 1 of 5</span>
        <div className="flex flex-col max-w-md mt-9 gap-6">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <div className="p-3 rounded border-2 border-gray-600">
            <input
              onChange={changeHandler}
              className="w-full outline-none bg-transparent text-white placeholder:text-gray-600"
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>
         
          <div className="p-3 rounded border-2 border-gray-600">
            <input
              onChange={changeHandler}
              className="w-full outline-none bg-transparent text-white placeholder:text-gray-600"
              name="email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="p-3 rounded border-2 border-gray-600">
            <input
              onChange={changeHandler}
              className="w-full outline-none bg-transparent text-white placeholder:text-gray-600"
              name="password"
              type="Password"
              placeholder="Password"
            />
          </div>
        </div>
        <span className="mt-8 flex max-w-md text-sm text-gray-600">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </span>
        <div className="bg-white text-black font-bold flex justify-center p-2 mt-16 cursor-pointer rounded-2xl">
          <Button text="Next" style={""} />
        </div>
      </div>
    </div>
  );
}

export default Register;
