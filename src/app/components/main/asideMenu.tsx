/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@/app/HOC/button";
import UserChat from "../chat/chat";
import { useStore } from "@/app/utils/myContext";
import EmailIcon from '@mui/icons-material/Email';
import { useSession } from "next-auth/react";

function AsideMenu() {
  const [users, setUsers] = useState<RegisterTypes[]>([]);
  const {setUsersId} = useStore()

  const {data:session} = useSession()

  useEffect(() => {
    const fetchApi = async () => {
      const respons = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/user`,
        {
          method: "GET",
        }
      );
      const getUser = await respons.json();
      const filterUser = getUser.filter((eachUser:RegisterTypes)=> eachUser.id !== session?.user.id)
      setUsers(filterUser);
    };
    fetchApi();
  }, [session]);

  const createOrOpenChatHandler = (reciverUserId:string | undefined) =>{
    setUsersId(reciverUserId)
  }

  return (
    <div className="m-4 flex flex-col fixed">
      <div className="pt-2 pb-2 pl-5 pr-5 rounded-2xl bg-xbackground">
        <SearchIcon className="bg-transparent" />
        <input
          className="bg-transparent outline-none font-xbackground"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-center text-center item-center mt-10 flex-col bg-xbackground p-2 rounded-2xl">
        <h1 className="text-start font-bold p-1 bg-transparent">Who to follow</h1>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex gap-3 mt-6 text-center justify-between bg-transparent "
            >
              <img className="w-8 h-8 bg-transparent rounded-2xl" src={user.image} alt="" />
              <div className="flex flex-col bg-transparent">
                <span className="bg-transparent">{user.name}</span>
              </div>
              <EmailIcon onClick={()=> createOrOpenChatHandler(user.id)} className=" cursor-pointer"/>
              <Button
                text="Follow"
                style={"bg-white text-black text-s  p-1 rounded-2xl"}
              />
            </div>
          );
        })}
      </div>
      <div className=""><UserChat/></div>
    </div>
  );
}

export default AsideMenu;
