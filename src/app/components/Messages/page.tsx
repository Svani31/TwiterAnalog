"use client"
import { Users } from "@/app/libs/eachUser";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

function Message() {

const {isError,isLoading,data} = useQuery<RegisterTypes[]>({
  queryKey:["Users"],
  queryFn:Users,
  refetchOnMount:false
})

  return (
    <div className="flex justify-between p-3">
      <div className="flex flex-col">
        {data?.map((eachData)=>{
          return(
            <div key={eachData.id} className="p-4 hover:bg-slate-500 rounded-2xl mt-8">
          <div className="flex gap-3">
            <img
              src={eachData.image}
              alt="Image"
              className="w-12 h-12 rounded-full bg-red-500"
            />
            <h1 className="flex flex-col text-xl">
              {eachData.name}
               <span className="font-thin text-xs">Last Message</span>
            </h1>
          </div>
        </div>
          )
        })}
      </div>

      <div className="w-[1600px]  bg-slate-500 p-2 rounded-2xl">
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
