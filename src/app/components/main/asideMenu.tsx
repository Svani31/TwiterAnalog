/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@/app/HOC/button";

function AsideMenu() {
  const [users, setUsers] = useState<RegisterTypes[]>([]);

  useEffect(() => {
    const fetchApi = async () => {
      const respons = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/user`,
        {
          method: "GET",
        }
      );
      const getUser = await respons.json();
      setUsers(getUser);
    };
    fetchApi();
  }, []);


  return (
    <div className="m-4 flex flex-col ">
      <div className="pt-2 pb-2 pl-5 pr-5 rounded-2xl bg-xbackground">
        <SearchIcon />
        <input
          className="bg-transparent outline-none font-xbackground"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex justify-center text-center item-center mt-10 flex-col bg-xbackground p-2 rounded-2xl">
        <h1 className="text-start">Who to follow</h1>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="flex gap-3 mt-6 text-center justify-between "
            >
              <img className="w-8 h-8" src={user.image} alt="" />
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span>@{user.email}</span>
              </div>
              <Button
                text="Follow"
                style={"bg-white text-black text-s  p-1 rounded-2xl"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AsideMenu;
