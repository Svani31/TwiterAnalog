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
import {format} from "date-fns"
import Link from "next/link";

function Post() {
  const [selectedPost, setSelectedPost] = useState<PostProps>();
  const [data,setData] = useState<any>()
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const fetchData = async () => {
      const fetchPost = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/eachPost/?id=${id}`
      );
      const post = await fetchPost.json();
      setSelectedPost(post);
    };
    fetchData();
  }, [id]);


  useEffect(()=>{
    if(selectedPost?.createdAt){
      const newData = new Date(selectedPost?.createdAt)
      const formatedDate = format(newData, `HH:mm a yyyy-MM-dd`)
      setData(formatedDate)
    }
  },[selectedPost])

  return (
    <div className="bg-black">
      <div  className="flex justify-center">
        <div style={{width:"600px"}} className=" border-l border-r border-gray-600">
          <h1 className="m-4">
            <Link href={"/components/main"}><ArrowBackIcon /> Post</Link>
          </h1>
          <div className="m-4">
            <div className="flex gap-4">
              <img className="w-8 h-8" src={selectedPost?.user.image} alt="" />
              <h3 className=" text-xs">{selectedPost?.user.name}</h3>
            </div>
            <div className="mt-2">
              <h1>{selectedPost?.content}</h1>
              <h1 className="text-xs text-gray-400">{data}</h1>
            </div>
            <div className=" border-t border-b border-gray-600 mt-3">
              <div className="flex justify-between p-2 text-xs">
              <h1><ChatBubbleOutlineIcon className="fill-grayIcons" />{selectedPost?.comment.length}</h1>
              <h1> <SyncIcon className="fill-grayIcons" />34 </h1>
              <h1><FavoriteBorderIcon className="fill-grayIcons" />{selectedPost?.like.length}</h1>
              <h1> <BarChartIcon className="fill-grayIcons" />123</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

{
  /* <div className="bg-black flex justify-between ">
      <HeaderList />
      <div className=" w-96 h-96 bg-red-500 flex justify-center">
        <h1 className="m-4">
          <ArrowBackIcon /> Post
        </h1>
        <div className="m-4">
          <div>
            <img className="w-5 h-5" src={selectedPost?.user.image} alt="" />
          </div>
        </div>
      </div>
    <div className="flex justify-end">
      <AsideMenu />
    </div>
    </div> */
}
