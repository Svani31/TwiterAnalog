/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import AsideMenu from "./asideMenu";
import ScrollingPage from "./scrollingPage";
import HeaderList from "./headerList";
import UserChat from "../chat/chat";
function MainPage() {

  return (
    <div className="bg-black flex w-full justify-between ">
      <div className="border-r border-gray-600">
        <HeaderList/>
      </div>
      <ScrollingPage/>
      {/* <Post/> */}
      {/* <EachPost/> */}
      <div className="flex justify-between w-full">
        <AsideMenu />
      </div>
    </div>
  );
}

export default MainPage;
