/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button from "@/app/HOC/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import Person2Icon from "@mui/icons-material/Person2";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AsideMenu from "./asideMenu";
import ScrollingPage from "./scrollingPage";
import EachPost from "../eachPost/[id]/page";
import { useStore } from "@/app/libs/useStore";
import Post from "./[id]/page";
import HeaderList from "./headerList";


function MainPage() {
  const [user, setUser] = useState<SessionProps | null>(null);
  const { data: session, status } = useSession<any>();
  const {isCommentSideOpen,setIsCommentSideOpen} =useStore()

  return (
    <div className="bg-black flex w-full ">
      <div className="pl-8 border-r border-gray-600">
        <HeaderList/>
      </div>
      <ScrollingPage />
      {/* <Post/> */}
      {/* <EachPost/> */}
      <div className="flex justify-center w-full">
        <AsideMenu />
      </div>
    </div>
  );
}

export default MainPage;
