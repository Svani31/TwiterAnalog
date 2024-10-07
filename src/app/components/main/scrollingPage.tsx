/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { CldUploadButton } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Button from "@/app/HOC/button";
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
import Link from "next/link";
import { pusherClient } from "@/app/utils/pusher";
import { GetPosts } from "@/app/libs/fetchPosts";
import { GetServerSideProps } from "next";
import { QueryClient, useQueries, useQuery } from "@tanstack/react-query";
interface SessionProps {
  id: string;
  image?: string;
}

interface PostProps {
  image: string | undefined;
  id: string;
  userId: string;
  content: string;
  user: {
    image: string;
    name: string;
  };
  comment: any[];
  like: any[];
}

const ScrollingPage = () => {
  const [postInput, setPostInput] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [user, setUser] = useState<SessionProps | null>(null);
  const [post, setPost] = useState<PostProps[]>([]);
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as SessionProps);
    }
  }, [session]);

  const { data, isError, isLoading } = useQuery<PostProps[]>({
    queryKey: ["Posts"],
    queryFn: GetPosts,
    refetchOnMount: false,
  });

  if (isLoading)
    <div>
      <h1>isLoading</h1>
    </div>;

  const createCommentHandler = () => {
    console.log("this is comments");
  };

  const createRepostHandler = () => {
    console.log("this is repost handler");
  };

  const createLikeHandler = async (postId: string) => {
    try {
      const getLikeData = await fetch(`/api/like`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const likes = await getLikeData.json();
      console.log(likes);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const createPostHandler = async () => {
    try {
      const createPost = await fetch(`/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postInput,
          userId: session?.user?.id,
          image: image,
        }),
      });
      const newPost = await createPost.json();
      console.log(newPost);
      setPostInput("");
      setUserId(newPost.user.id);
    } catch (error) {
      alert("Cant Create Post");
    }
  };

  useEffect(() => {
    if (data) {
      setPost(data);
    }
    if (userId) {
      pusherClient.subscribe(userId);
      const handleIncomingPost = (newPost: PostProps) => {
        console.log(newPost);
        setPost((prev) => [...prev, newPost]);
      };
      pusherClient.bind("creating-post", handleIncomingPost);

      return () => {
        pusherClient.unbind("creating-post", handleIncomingPost);
        pusherClient.unsubscribe(userId);
      };
    }
  }, [userId, data]);

  return (
    <div className="flex flex-col">
      <div style={{ maxWidth: "600px" }} className="">
        <div className="flex justify-around border-r border-b border-gray-600">
          <div className="p-5 text-center">For You</div>
          <div className="p-5 text-center">Following</div>
        </div>
        <div
         
          className="flex flex-col border-r border-b border-gray-600 w-[600px] "
        >
          <div className="flex ">
            <img className="w-10 h-10 m-5" src={user?.image} alt="user Image" />
            <input
              placeholder="What is Happening?"
              className="bg-transparent outline-none p-8"
              value={postInput}
              onChange={(e) => setPostInput(e.target.value)}
            />
          </div>
          <div className="flex justify-between ml-5 mr-5 mb-5">
            <div className="flex gap-3 ml-6">
              <div>
                <CldUploadButton
                  uploadPreset="twitter-analog"
                  onSuccess={(result:any) => setImage(result.info?.url)}
                >
                  <ImageIcon className="fill-blueIcons" />
                </CldUploadButton>
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
      {post.map((eachPost: PostProps) => (
        <div
          className="border-r border-b border-gray-600 cursor-pointer"
          key={eachPost.id}
        >
          <Link href={`/components/main/${eachPost.id}`}>
            <div className="p-4">
              <div className="flex">
                <img
                  className="w-8 h-8 rounded-2xl"
                  src={eachPost.user.image}
                  alt=""
                />
                <h2 className="ml-2">{eachPost.user.name}</h2>
              </div>
              <h1 className="flex ml-7 mt-6">{eachPost.content}</h1>
              {eachPost.image ? (
                <div className="flex justify-center mt-5">
                  <img
                    style={{ width: "400px" }}
                    className="flex rounded-xl"
                    src={eachPost.image}
                    alt=""
                  />
                </div>
              ) : (
                ""
              )}

              <div className="flex justify-between mt-4">
                <div
                  className="cursor-pointer z-10"
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
                  className="cursor-pointer"
                  onClick={(e) => createLikeHandler(eachPost.id)}
                >
                  <FavoriteBorderIcon className="fill-grayIcons" />
                  <span className="text-gray-600">{eachPost.like.length}</span>
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
      ))}
    </div>
  );
};

export default ScrollingPage;
