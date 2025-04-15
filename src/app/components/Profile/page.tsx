"use client";
import AsideMenu from "../main/asideMenu";
import HeaderList from "../main/headerList";
import React, { useEffect, useState } from "react";

// mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSession, useSession } from "next-auth/react";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Link from "next/link";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {format} from "date-fns";

interface MediaBarType {
  Post:string,
  Replay:string,
  Highlights:string,
  Articles:string,
  Media:string
  Likes:string
}

interface SessionProps {
  id:string;
  email:string;
  image:string;
  name:string;
  password:string;
  post:PostProps[];
}

const Profile = () => {
  const [idUser, setIdUser] = useState<SessionProps>();
    const {data:session} = useSession()
  const [mediaBar,setMediaBar] = useState<any>(["Post", "Replay", "Highlights", "Articles", "Media", "Likes"])
console.log(session)
  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch(
        `/api/getUser`,
        {
          method: "POST",
          headers: {
            "Conten-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user.id,
          }),
        }
      );
      const user = await respons.json();
      setIdUser(user);
    };
    fetchData();
  }, [session]);

  // useEffect(() => {
  //   if (idUser?.post?.createdAt) {
  //     const newData = new Date(idUser.post?.createdAt);
  //     const formatedDate = format(newData, `HH:mm a yyyy-MM-dd`);
  //     // @ts-ignore
  //     setData(formatedDate);
  //   }
  // }, [selectedPost]);

  const uploadImageHandler = async(result:any) =>{
    const session = await getSession()
    try{
      const respons = await fetch("/api/uploadImage",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:session?.user.id,image:result.info?.url})
      })
      
    }catch(error){
      throw error
    }
  }
  console.log(idUser?.post,"this is post")

  return (
    <div className="flex">
      <div>
        <HeaderList />
      </div>
      <div className="flex flex-col  border-l-2 border-gray-600 border-r-2">
        <div className="flex flex-row col gap-7 text-xl,l items-center mt-2">
          <ArrowBackIcon />
          <h1 className=" font-bold flex flex-col">
            {idUser?.name}{" "}
            <span className=" text-sm font-normal">{} post</span>
          </h1>
        </div>
        <div className=" relative">
          <img
            src={idUser?.image}
            style={{ width: "600px", height: "200px",backgroundSize:"cover" }}
            alt=""
          />
          <img
            src={idUser?.image}
            style={{
              width: "133px",
              height: "133px",
              bottom: "-60px",
              left: "20px",
            }}
            className=" rounded-full absolute border-4 border-black"
            alt=""
          />
        </div>
        <div className="mt-16 ml-4 mr-4">
          <div className="flex justify-between">
            <h1 className="p-2">{idUser?.name}</h1>
            <h1 className="bg-blue-500 p-2 rounded-2xl">
            <CldUploadButton uploadPreset="twitter-analog" onSuccess={(result) => uploadImageHandler(result)} />
            </h1>
          </div>
          <div className="flex mt-6">
            <CalendarMonthIcon className="fill-gray-600" />{" "}
            <h1 className="text-gray-600">Joined December 2016</h1>
          </div>
          <div className="flex gap-2 mt-5 ">
            <h1 className="text-gray-600">
              <span>0</span> Following
            </h1>
            <h1 className="text-gray-600">
              <span>0</span> Followers
            </h1>
          </div>
          <div className="flex justify-between mr-6 text-gray-600 mt-5">
            {mediaBar.map((eachMedia:any ,index:number)=>{
              return(
                <div  key={index}>
                  <h1 className="cursor-pointer">{eachMedia}</h1>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-5 border-gray-600 border-t-2">
          {idUser?.post.map((eachPost: PostProps) => (
              <div
                  className="border-r border-b border-gray-600 cursor-pointer"
                  key={eachPost.id}
              >
                <Link href={`/components/main/${eachPost.id}`}>
                  <div className="p-4">
                    <div className="flex">
                      <img
                          className="w-8 h-8 rounded-2xl"
                          src={idUser?.image}
                          alt=""
                      />
                      <h2 className="ml-2">{}</h2>
                    </div>
                    <h1 className="flex ml-7 mt-6">{eachPost.content}</h1>
                    {eachPost.createdAt && (
                        <h1 className="text-xs text-gray-400 mt-2">
                          {format(new Date(eachPost.createdAt), 'HH:mm a yyyy-MM-dd')}
                        </h1>
                    )}
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
                          // onClick={() => createCommentHandler()}
                      >
                        <ChatBubbleOutlineIcon className="fill-grayIcons" />
                        <span className="text-gray-600">
                    {}
                  </span>
                      </div>
                      <div>
                        <SyncIcon className="fill-grayIcons" />
                        <span className="text-gray-600">25</span>
                      </div>
                      <div
                          className="cursor-pointer"
                          // onClick={(e) => createLikeHandler(eachPost.id)}
                      >
                        <FavoriteBorderIcon className="fill-grayIcons" />
                        <span className="text-gray-600">{}</span>
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
      </div>
      <div>

       <AsideMenu />
      </div>
    </div>
  );
};

export default Profile;
