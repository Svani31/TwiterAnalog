"use client"
import { Users } from "@/app/libs/eachUser";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Chat from "./[id]/chat";

function Message() {
  const [userId,setUserId] = useState<string | undefined>("")
  
  const {isError,isLoading,data} = useQuery<RegisterTypes[]>({
    queryKey:["Users"],
    queryFn:Users,
    refetchOnMount:false
  })
  
  const getUserIdHandler = (id:string | undefined) =>{
      setUserId(id)
      const newUrl = `${window.location.pathname}?id=${id}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
  }

  return (
    <div className="flex justify-between p-3">
      <div className="flex flex-col">
        {data?.map((eachData)=>{
          return(
            <div key={eachData.id} onClick={(e)=> getUserIdHandler(eachData.id)} className="p-4 hover:bg-slate-500 rounded-2xl mt-8">
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

        <Chat/>
    </div>
  );
}

export default Message;
