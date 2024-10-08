"use client"
import React, { useEffect } from "react";

function Message() {

  useEffect(()=>{
    const fetchUsers = async() =>{
      const respons = await fetch("/api/user")
      const users = await respons.json()
      console.log(users)
    }
    fetchUsers()
  },[])


  return (
    <div className="flex justify-between p-3">
      <div className="flex flex-col">
        <div className=" p-4">
          <div className="flex">
            <img
              src=""
              alt="Image"
              className="w-12 h-12 rounded-full bg-red-500"
            />
            <h1 className="flex flex-col">
              Users Name <span className="font-thin text-xs">Last Message</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="w-[1500px]  bg-slate-500 p-2 rounded-2xl">
        <div className="flex items-center gap-3">
          <img
            src=""
            alt="Image"
            className="w-12 h-12 rounded-full bg-red-500"
          />
          <h1 className="flex flex-col">Users Name</h1>
        </div>
        <div className="h-[800px] mt-7">
          <div className="flex justify-between flex-col">
            <div className=" w-fit">
              <h1 className="bg-blue-600 p-3 rounded-3xl">pirveli message</h1>
            </div>
            <div className=" mt-4 p-3 flex justify-end  ">
              <h1 className="bg-red-600 p-3 rounded-3xl">Meore Message message</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-center items-center gap-3">
          <h1>Logo</h1>
          <input
            type="Whats In Your Mind?"
            className="bg-slate-700 p-3 w-[500px] outline-none rounded-3xl"
          />
          <h1>Logo</h1>
        </div>
      </div>
    </div>
  );
}

export default Message;
