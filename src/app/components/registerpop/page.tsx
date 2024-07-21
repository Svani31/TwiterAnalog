"use client";
import Button from "@/app/HOC/button";
import { useStore } from "@/app/utils/myContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


function Register() {
  const [registerInput, setRegisterInputs] = useState<RegisterTypes>({
    name: "",
    email: "",
    password: "",
    image: "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
  });

  const route = useRouter()
  const { openButtonHandler, setIsRegisterOpen, isRegisterOpen } = useStore();
  const changeHandler = (e: any) => {
    setRegisterInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handelImageUpload =async (e:any) =>{
  // const file = e.target.files[0] 
  // const base64 = await convertToBase64(file)
  // setRegisterInputs((prev) => ({...prev, image:base64,}))  
  // }

  const createUser = async() =>{
    const {name,email,password} = registerInput
    if(!name || !email || !password){
      alert("Plase Fill Input fields")
    }else{
      try{
        const createUser = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/user`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(registerInput)
        })
        if(createUser.ok){
          const signInToUser = await signIn("credentials",{
            redirect:false,
            name:name,
            password:password
          })
          console.log(signInToUser,"this is ")
          if(signInToUser?.ok){
            route.push("components/main")
          }else{
            throw alert("Pleace Enter Correct Inputs")
          }

        }
      }catch(error){
        throw error
      }
    }
    
  }



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
          {/* <input
            onChange={(e) =>handelImageUpload(e)}
            type="file"
            name="image"
            id=""
            accept=".jpeg, .png, .jpg"
          /> */}
        </div>
        <span className="mt-8 flex max-w-md text-sm text-gray-600">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </span>
        <div onClick={()=> createUser()} className="bg-white text-black font-bold flex justify-center p-2 mt-16 cursor-pointer rounded-2xl">
          <Button text="Next" style={""} />
        </div>
      </div>
    </div>
  );
}

export default Register;

// const convertToBase64 = (file: any) => {
//   return new Promise((resolve, reject) => {
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload = () => {
//       resolve(fileReader.result);
//     };
//   });
// };
