/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/app/HOC/button";
// importing mui icons
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import { useTheme } from "@mui/material"

function Post() {
  const [user, setUser] = useState<SessionProps | null>(null);
  const [post, setPost] = useState<PostProps[] | null>([]);
  const { data: session } = useSession();

  const theme = useTheme()
  // console.log(theme.palette.customColor.main,"this is main")

  useEffect(() => {
    setUser(session as SessionProps | null);
  }, [session]);

  const createPostHandler = () => {
    alert("Post Created Succes1");
  };

  useEffect(() => {
    const getPosts = async () => {
      const getData = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/post`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await getData.json();
      setPost(data);
    };
    getPosts();
  }, []);


 

  console.log(post, "this is post");
  return (
    <div className="flex flex-col">
      <div style={{ maxWidth: "600px" }} className="">
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
              src={user?.image}
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
                <ImageIcon className="fill-blueIcons" />
              </div>
              <div>
                <GifBoxIcon className="fill-blueIcons" />
              </div>
              <div>
                <SentimentSatisfiedAltIcon className="fill-blueIcons" />
              </div>
              <div>
                <PendingActionsIcon className="fill-blueIcons" />
              </div>
            </div>
            <div onClick={() => createPostHandler()}>
              <Button
                text="Post"
                style={"bg-blue-500 rounded-2xl pl-3 pr-3 pt-1 pb-1"}
              />
            </div>
          </div>
        </div>
      </div>
      {post?.map((eachPost) => {
        return (
          <div className="border-r border-b border-gray-600" key={eachPost.id}>
            <div className="p-4">
              <div className="flex">
                <img className="w-8 h-8" src={eachPost.user.image} alt="" />
                <h2 className="ml-2">{eachPost.user.name}</h2>
              </div>
              <h1 className="flex ml-7 ">{eachPost.content}</h1>
              <div className="flex justify-between mt-4">
                <div >
                  <ChatBubbleOutlineIcon className="fill-grayIcons" />
                  <span className="text-gray-600">{eachPost.comment.length}</span>
                </div>
                <div >
                  <SyncIcon className="fill-grayIcons" />
                  <span className="text-gray-600">25</span>
                </div>
                <div>
                  <FavoriteBorderIcon className="fill-grayIcons" />
                  <span className="text-gray-600">{eachPost.like.length}</span>
                </div>
                <div >
                  <BarChartIcon className="fill-grayIcons" />
                  <span className="text-gray-600">70</span>
                </div>
                <div>
                  <UploadSharpIcon className="fill-grayIcons"  />
                  <BookmarkBorderIcon className="fill-grayIcons" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
