/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AsideMenu from "../asideMenu";
import HeaderList from "../headerList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SyncIcon from "@mui/icons-material/Sync";
import BarChartIcon from "@mui/icons-material/BarChart";
import { format } from "date-fns";
import Link from "next/link";
import { useSession } from "next-auth/react";

// importing mui

import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import GifBoxIcon from "@mui/icons-material/GifBox";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Post() {
  const [selectedPost, setSelectedPost] = useState<PostProps>();
  const [data, setData] = useState<any>();
  const params = useParams();
  const id = params.id;
  const { data: session } = useSession();
  const [inputValue,setInputValue] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      const fetchPost = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/post/${id}`,
        {
          method: "GET",
        }
      );
      const post = await fetchPost.json();
      console.log(post);
      setSelectedPost(post);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (selectedPost?.createdAt) {
      const newData = new Date(selectedPost?.createdAt);
      const formatedDate = format(newData, `HH:mm a yyyy-MM-dd`);
      setData(formatedDate);
    }
  }, [selectedPost]);

  const handelCreateComment = async () =>{
    try{
      const createMessage = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/comment`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userId:session?.user.id,
          postId:id,
          context:inputValue
        })
      })
      console.log(createMessage,"this is created message")
    }catch(error){
      throw error
    }
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const respons = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}`)
    }
  },[])

  return (
    <div className="bg-black">
      <div className="flex justify-center">
        <div
          style={{ width: "600px" }}
          className=" border-l border-r border-gray-600"
        >
          <h1 className="m-4">
            <Link href={"/components/main"}>
              <ArrowBackIcon /> Post
            </Link>
          </h1>
          <div className="m-4">
            <div className="flex gap-4">
              <img
                className="w-8 h-8 rounded-full"
                src={selectedPost?.user.image}
                alt=""
              />
              <h3 className=" text-xs font-bold">{selectedPost?.user.name}</h3>
            </div>
            <div className="mt-2">
              <h1>{selectedPost?.content}</h1>
              <h1 className="text-xs text-gray-400">{data}</h1>
            </div>
            <div className=" border-t border-b border-gray-600 mt-3">
              <div className="flex justify-between p-2 text-xs">
                <h1>
                  <ChatBubbleOutlineIcon className="fill-grayIcons" />
                  {selectedPost?.comment.length}
                </h1>
                <h1>
                  {" "}
                  <SyncIcon className="fill-grayIcons" />
                  34{" "}
                </h1>
                <h1>
                  <FavoriteBorderIcon className="fill-grayIcons cursor-pointer" />
                  {selectedPost?.like.length}
                </h1>
                <h1>
                  {" "}
                  <BarChartIcon className="fill-grayIcons" />
                  123
                </h1>
              </div>
            </div>
          </div>
          <div className="pl-5 pr-5 flex justify-between">
            <div className="mt-5">
              <img
                className="w-10 h-10 rounded-full"
                src={session?.user?.image ?? undefined}
                alt="image"
              />
            </div>
            <div className="w-full pl-5">
              <div className="text-gray-400">
                Replying To{" "}
                <span className="text-blue-600">
                  @{selectedPost?.user.name}
                </span>
              </div>
              <div>
                <input
                  className="w-full h-10 bg-transparent outline-none placeholder:text-gray-400"
                  placeholder="Post Your Reply"
                  value={inputValue}
                  onChange={(e)=> setInputValue(e.target.value)}
                />
              </div>
              <div>
                <div className=" flex justify-between">
                  <div className="flex gap-2 mt-2">
                    <div>
                      <BrokenImageIcon className=" fill-blueIcons" />
                    </div>
                    <div>
                      <GifBoxIcon className=" fill-blueIcons" />
                    </div>
                    <div>
                      <EmojiEmotionsIcon className=" fill-blueIcons" />
                    </div>
                    <div>
                      <LocationOnIcon className=" fill-blueIcons" />
                    </div>
                  </div>
                  <div className="flex justify-end text-end">
                    <button onClick={()=> handelCreateComment()} className="p-2 mb-2 bg-blue-600 rounded-3xl">
                      Replying
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* each comment */}
          <div className="border-t border-gray-600 mt-2">
            <div className="m-4">
              {/* user credential */}
              <div className="flex gap-3">
                <img
                  className="rounded-full w-10 h-10"
                  src={session?.user?.image ?? undefined}
                  alt=""
                />
                <div>
                  <h1 className="text-m font-bold">{session?.user.name}</h1>
                  <h1 className="font-extralight">{selectedPost?.content}</h1>
                </div>
              </div>
            </div>
              <div className=" border-b border-gray-600 mt-3">
                <div className="flex justify-between p-2 text-xs">
                  <h1>
                    <ChatBubbleOutlineIcon className="fill-grayIcons" />
                    {selectedPost?.comment.length}
                  </h1>
                  <h1>
                    {" "}
                    <SyncIcon className="fill-grayIcons" />
                    34{" "}
                  </h1>
                  <h1>
                    <FavoriteBorderIcon className="fill-grayIcons cursor-pointer" />
                    {selectedPost?.like.length}
                  </h1>
                  <h1>
                    {" "}
                    <BarChartIcon className="fill-grayIcons" />
                    123
                  </h1>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
