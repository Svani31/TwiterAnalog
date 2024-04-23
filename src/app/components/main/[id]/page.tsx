/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AsideMenu from "../asideMenu";
import HeaderList from "../headerList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Post() {
  const [selectedPost, setSelectedPost] = useState<PostProps>();
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
  console.log(selectedPost, "this is Fetch Post");
  return (
    <div className="bg-black flex w-full justify-between ">
      <HeaderList />
      <div className=" w-full">
        <h1 className="m-4">
          <ArrowBackIcon /> Post
        </h1>
        <div className="m-4">
          <div>
            <img className="w-5 h-5" src={selectedPost?.user.image} alt="" />
          </div>
        </div>
      </div>
      <AsideMenu />
    </div>
  );
}

export default Post;
