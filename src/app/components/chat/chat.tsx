import { useStore } from "@/app/utils/myContext";
import { FormEvent, useEffect, useState } from "react";
import "@/app/utils/styles/globals.css";
// importing mui items
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import MicIcon from "@mui/icons-material/Mic";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getChat } from "@/app/libs/getChat";
import { pusherClient } from "@/app/utils/pusher";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";

const UserChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatDown, setIsChatDown] = useState(false);
  const [isUserChat,setIsUserChat] = useState<RegisterTypes>()
  const [incommingMessage,setIncommingMessage] = useState<MessageProps[] | undefined>([])
  const [message,setMessage] = useState<string>("")

  const { usersId,setUsersId } = useStore();
  const { data: session } = useSession();

  
  useEffect(() => {
    if (usersId){
      setIsChatOpen(true)
    }else{
      setIsChatOpen(false)
    }
  }, [usersId]);

  const myUserId = session?.user?.id;
  const reciverUserId = usersId;

  const { data, isLoading } = useQuery<RegisterTypes | undefined>({
    queryKey: ["chat", myUserId, reciverUserId],
    queryFn: () => {
      if(myUserId && reciverUserId){
        return getChat(myUserId, reciverUserId)
      }
    },
    refetchOnMount: false,
    enabled: !!myUserId && !!reciverUserId,
  });

  useEffect(()=>{
    if(usersId){
      const fetchUser = async()=>{
        const respons = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/getUser`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
              userId:usersId
          })
        })
        const data = await respons.json()
        setIsUserChat(data)
      }
      fetchUser()
    }
  },[usersId])

  useEffect(()=>{
    if(data){
      setIncommingMessage(data.message)
    }
    pusherClient.subscribe("message")
    const handleIncommingMessage = (newMessage:any) =>{
      setIncommingMessage((prev:any) => [...prev,newMessage])
    }
    pusherClient.bind("message",handleIncommingMessage)
    return ()=>{
      pusherClient.unsubscribe("message")
      pusherClient.unbind("message",handleIncommingMessage)
    }
  },[usersId,data])


  const submitMessageHandler = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(message?.length < 0) return
    try{
      const respons = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/message`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          context:message,
          image:"",
          chatId:data?.id,
          userId:reciverUserId
        })
      })
      const pusherMessage = await respons.json()
      setIncommingMessage((prev:any) => [...prev,pusherMessage])
      setMessage("")
    }catch(error){
      throw error
    } 
  }
  

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
              <img className="w-8 rounded-2xl" src={isUserChat?.image} alt="" />
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
            <div className=" cursor-pointer" onClick={()=> setUsersId()}>
            <CloseIcon/>
            </div>
          </div>
        </div>
        <div className={isChatDown ? "hidden" : ""}>
          <div className="mt-5 mb-2 h-56 overflow-y-auto scrollbar-hide">
            {incommingMessage?.map((eachMessage)=>{
              return(
                <div key={eachMessage.id}>
                  {eachMessage.userId == session?.user.id ? (<div className=" flex justify-end mt-4">
              <p className="bg-blue-500 p-2 rounded-2xl">{eachMessage.context}</p>{" "}
            </div>) : (<div className="flex  justify-start mt-4">
              <p className="bg-red-500 p-2 rounded-2xl">{eachMessage.context}</p>
            </div>)}
                </div>
              )
            })}
            
          </div>
          <div className="flex">
            <div className="gap-1 flex">
              {message.length > 0 ? ( <><AddCircleIcon/></>) : (
               <><MicIcon className=" fill-gray-800" />
               <BrokenImageIcon className=" fill-gray-800" />
               <GifBoxIcon className=" fill-gray-800" /></>
              )}
              {/* <><AddCircleIcon/></> */}
            </div>
            <div className="flex">
              <div className={message.length > 0 ? ("bg-gray-800 rounded-2xl h-7 flex w-48 ml-2") : ("bg-gray-800 rounded-2xl h-7 flex w-40 ml-2 trans")}>
                <form className="flex" onSubmit={submitMessageHandler} >
                <input
                  className="outline-none bg-transparent ml-4" 
                  placeholder="Aa"
                  value={message}
                  onChange={(e)=> setMessage(e.target.value)}
                  />
                  </form>
              </div>
              {message.length > 0 ? (<SendIcon className="ml-3 fill-gray-800"/>) :( <ThumbUpIcon className="ml-1 fill-gray-800" />) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
