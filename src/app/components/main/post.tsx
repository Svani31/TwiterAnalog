/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/app/HOC/button";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
function Post() {
  const [user, setUser] = useState<SessionProps | null>(null);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    setUser(session as SessionProps | null);
  }, [session]);

  return (
    <div className="flex">
      <div style={{ maxWidth: "600px", height:"100vh" }} className="bg-red-500">
        <div className="flex justify-around border-r border-b border-gray-600">
          <div className="p-5 text-center">For You</div>
          <div className="p-5 text-center">Following</div>
        </div>
        <div
          style={{ width: "600px" }}
          className="flex flex-col  border-r border-b border-gray-600 "
        >
          <div className="flex ">
            <img
              className=" w-10 h-10 m-5"
              src={user?.picture}
              alt="user Image"
            />
            <input
              placeholder="What is Happening?"
              className=" bg-transparent outline-none p-8"
            />
          </div>
          <div className="flex justify-between ml-5 mr-5 mb-5">
            <div className="flex gap-3 ml-6">
              <div>
                <ImageIcon color="secondary" />
              </div>
              <div>
                <GifBoxIcon color="secondary" />
              </div>
              <div>
                <SentimentSatisfiedAltIcon />
              </div>
              <div>
                <PendingActionsIcon />
              </div>
            </div>
            <div>
              <Button
                text="Post"
                style={"bg-blue-500 rounded-2xl pl-3 pr-3 pt-1 pb-1"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* aside menu */}
      <div>
      <input/>
      </div>
    </div>
  );
}

export default Post;
