import { useStore } from "@/app/utils/myContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import "@/app/utils/styles/globals.css";
// importing mui items
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import MicIcon from "@mui/icons-material/Mic";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getChat } from "@/app/libs/getChat";
import { pusherClient } from "@/app/utils/pusher";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Link from "next/link";
import { CldUploadButton } from "next-cloudinary";
import React from "react";

const UserChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatDown, setIsChatDown] = useState(false);
  const [isUserChat, setIsUserChat] = useState<RegisterTypes>();
  const [image,setImage] = useState<any>("")
  const [incommingMessage, setIncommingMessage] = useState<
    MessageProps[] | undefined
  >([]);
  const [message, setMessage] = useState<string>("");
  const [messageId, setMessageId] = useState<string>("");

  const { usersId, setUsersId } = useStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (usersId) {
      setIsChatOpen(true);
    } else {
      setIsChatOpen(false);
    }
  }, [usersId]);

  const myUserId = session?.user?.id;
  const reciverUserId = usersId;

  const { data, isLoading } = useQuery<RegisterTypes | undefined>({
    queryKey: ["chat", myUserId, reciverUserId],
    queryFn: () => {
      if (myUserId && reciverUserId) {
        return getChat(myUserId, reciverUserId);
      }
    },
    refetchOnMount: false,
    enabled: !!myUserId && !!reciverUserId,
  });

  const submitMessageHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message?.length < 0) return;
    try {
      const respons = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context: message,
            image: image,
            chatId: data?.id,
            userId: reciverUserId,
          }),
        }
      );
      const pusherMessage = await respons.json();
      setMessageId(pusherMessage.chat.id);
      console.log(pusherMessage);
      setMessage("");
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (usersId) {
      const fetchUser = async () => {
        const respons = await fetch(`/api/getUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: usersId,
          }),
        });
        const data = await respons.json();
        setIsUserChat(data);
      };
      fetchUser();
    }
  }, [usersId]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setIncommingMessage(data.message);
    }
    if (!messageId) return;
    console.log(messageId);
    pusherClient.subscribe(messageId);
    const handleIncommingMessage = (newMessage: any) => {
      setIncommingMessage((prev: any) => [...prev, newMessage]);
    };
    pusherClient.bind("message", handleIncommingMessage);
    return () => {
      pusherClient.unsubscribe(messageId);
      pusherClient.unbind("message", handleIncommingMessage);
    };
  }, [messageId, data, data?.myChat?.id]);

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(()=>{
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[incommingMessage])

  return (
    <div
      style={
        isChatOpen
          ? { position: "fixed", right: "150px", bottom: "0", width: "300px" }
          : { visibility: "hidden" }
      }
    >
      <div className="bg-gray-500 p-3 rounded-t-xl">
        <div className="flex justify-between">
          <Link href={`/components/eachUser/${isUserChat?.id}`}>
            <div className="flex justify-center cursor-pointer items-center gap-2">
              <div>
                <img
                  className="w-8 h-8 rounded-2xl"
                  src={isUserChat?.image}
                  alt=""
                />
              </div>
              <h1>{isUserChat?.name}</h1>
            </div>
          </Link>
          <div className="flex">
            <div>
              <div
                className="font-bold text-2xl"
                onClick={(e) => setIsChatDown(!isChatDown)}
              >
                {isChatDown ? (
                  <ExpandLessIcon className="flex justify-center items-center text-center" />
                ) : (
                  <KeyboardArrowDownIcon className="flex justify-center items-center text-center" />
                )}
              </div>
            </div>
            <div className=" cursor-pointer" onClick={() => setUsersId()}>
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className={isChatDown ? "hidden" : ""}>
          <div className="mt-5 mb-2 h-56 overflow-y-auto scrollbar-hide">
            {incommingMessage?.map((eachMessage,index) => {
              return (
                <div ref={index == incommingMessage.length - 1 ? bottomRef : null}  key={eachMessage.id}>
                  {eachMessage.userId == session?.user.id ? (
                    <div className=" flex justify-end mt-4">
                      <p className="bg-red-500 p-2 rounded-2xl">
                        {eachMessage.context}
                        {eachMessage.image ? (<img src={eachMessage.image} alt="image" />) : ""}
                        </p>{" "}
                    </div>
                  ) : (
                    <div className="flex  justify-start mt-4">
                      <p className="bg-blue-500 p-2 rounded-2xl">
                        {eachMessage.context}
                        {eachMessage.image ? (<img src={eachMessage.image} alt="image" />) : ""}
                        </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex">
            <div className="gap-1 flex">
              {message.length > 0 ? (
                <>
                  <AddCircleIcon />
                </>
              ) : (
                <>
                  <MicIcon className=" fill-gray-800 hover:fill-white cursor-pointer" />
                  <CldUploadButton uploadPreset="twitter-analog" className="flex" onSuccess={(result:any)=> setImage(result.info?.url)}>
                    <BrokenImageIcon className=" fill-gray-800 hover:fill-white" />
                  </CldUploadButton>
                  <GifBoxIcon className=" fill-gray-800 hover:fill-white cursor-pointer" />
                </>
              )}
              {/* <><AddCircleIcon/></> */}
            </div>
            <div className="flex">
              <div
                className={
                  message.length > 0
                    ? "bg-gray-800 rounded-2xl h-7 flex w-48 ml-2"
                    : "bg-gray-800 rounded-2xl h-7 flex w-40 ml-2 trans"
                }
              >
                <form className="flex" onSubmit={submitMessageHandler}>
                  <input
                    className="outline-none bg-transparent ml-4"
                    placeholder="Aa"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </form>
              </div>
              {message.length > 0 ? (
                <SendIcon className="ml-3 fill-gray-800 hover:fill-white cursor-pointer" />
              ) : (
                <ThumbUpIcon className="ml-1 fill-gray-800 hover:fill-white cursor-pointer" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
