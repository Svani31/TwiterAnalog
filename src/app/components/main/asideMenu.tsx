/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@/app/HOC/button";
import UserChat from "../chat/chat";
import { useStore } from "@/app/utils/myContext";
import EmailIcon from "@mui/icons-material/Email";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { asideUser } from "@/app/libs/fetchAsideUser";

function AsideMenu() {
  // const [users, setUsers] = useState<RegisterTypes[]>([]);
  const { setUsersId } = useStore();

  const { data: session } = useSession();

<<<<<<< HEAD
  const { data, isLoading, isError } = useQuery<RegisterTypes[] | undefined>({
    queryKey: ["asideMenu",session?.user.id],
    queryFn:()=>{
      if(session?.user.id){
        return asideUser(session.user.id)
      }
    },
    enabled: !!session?.user.id,
    refetchOnMount:false
  });
=======
  useEffect(() => {
    const fetchApi = async () => {
      const respons = await fetch(
        `/api/user`,
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
>>>>>>> 59661986d61c6e6fa85f0f9180a4f75ffef0d054

  console.log(data)

  const createOrOpenChatHandler = (reciverUserId: string | undefined) => {
    setUsersId(reciverUserId);
  };

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
        <h1 className="text-start font-bold p-1 bg-transparent">
          Who to follow
        </h1>
        {data?.map((user) => {
          return (
            <div
              key={user.id}
              className="flex gap-3 mt-6 text-center justify-between bg-transparent "
            >
              <img
                className="w-8 h-8 bg-transparent rounded-2xl"
                src={user.image}
                alt=""
              />
              <div className="flex flex-col bg-transparent">
                <span className="bg-transparent">{user.name}</span>
              </div>
              <EmailIcon
                onClick={() => createOrOpenChatHandler(user.id)}
                className=" cursor-pointer"
              />
              <Button
                text="Follow"
                style={"bg-white text-black text-s  p-1 rounded-2xl"}
              />
            </div>
          );
        })}
      </div>
      <div className="">
        <UserChat />
      </div>
    </div>
  );
}

export default AsideMenu;
