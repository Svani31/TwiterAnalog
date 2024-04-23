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
import { useTheme } from "@mui/material";
import Link from "next/link";
import "next-auth"

function ScrollingPage() {
  const [postInput, setPostInput] = useState<string>();
  const [user, setUser] = useState<SessionProps | null>(null);
  const [post, setPost] = useState<PostProps[] | null>([]);
  const { data: session } = useSession();

  
  const theme = useTheme();
  // console.log(theme.palette.customColor.main,"this is main")

  useEffect(() => {
    setUser(session?.user as SessionProps | null);
    console.log(session, "this is session");
  }, [session]);

  // const createPostHandler = () => {
  //   alert("Post Created Succes1");
  // };

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

  const createCommentHandler = () => {
    console.log("this is comments");
  };

  const createRepostHandler = () => {
    console.log("this is repost handler");
  };

  // try{
  //   const createLike = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/like`,{
  //     method:"POST",
  //     headers:{
  //       "Content-Type": "application/json"
  //     },
  //     body:JSON.stringify({
  //       userId:user?.id,
  //       postId:postId
  //     })
  //   })
  //   console.log(createLike,"this is like")

  // }catch(error){
  //   throw error
  // }

  const createLikeHandler = async (postId: string) => {
    try {
      const getLikeData = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/like`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const likes = await getLikeData.json();
      console.log(likes);
    } catch (error) {
      throw error;
    }
  };
  const createPostHandler = async () => {
    try {
      const createPost = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content:postInput,
            userId:session?.user?.id
          }),
        }
      );
      const getPost = await createPost.json()
      setPost(getPost)
    } catch (error) {
      throw error;
    }
  };

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
              onChange={(e) => setPostInput(e.target.value)}
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
          <div
            className="border-r border-b border-gray-600 cursor-pointer"
            key={eachPost.id}
          >
            <Link href={`/components/main/${eachPost.id}`}>
              <div className="p-4">
                <div className="flex">
                  <img className="w-8 h-8" src={eachPost.user.image} alt="" />
                  <h2 className="ml-2">{eachPost.user.name}</h2>
                </div>
                <h1 className="flex ml-7 ">{eachPost.content}</h1>
                <div className="flex justify-between mt-4">
                  <div
                    className=" cursor-pointer z-10"
                    onClick={() => createCommentHandler()}
                  >
                    <ChatBubbleOutlineIcon className="fill-grayIcons" />
                    <span className="text-gray-600">
                      {eachPost.comment.length}
                    </span>
                  </div>
                  <div>
                    <SyncIcon className="fill-grayIcons" />
                    <span className="text-gray-600">25</span>
                  </div>
                  <div
                    className=" cursor-pointer"
                    onClick={(e) => createLikeHandler(eachPost.id)}
                  >
                    <FavoriteBorderIcon className="fill-grayIcons" />
                    <span className="text-gray-600">
                      {eachPost.like.length}
                    </span>
                  </div>
                  <div>
                    <BarChartIcon className="fill-grayIcons" />
                    <span className="text-gray-600">70</span>
                  </div>
                  <div>
                    <UploadSharpIcon className="fill-grayIcons" />
                    <BookmarkBorderIcon className="fill-grayIcons" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ScrollingPage;
