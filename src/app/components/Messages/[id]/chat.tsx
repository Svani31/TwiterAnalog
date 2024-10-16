"use client";
import { getChat } from "@/app/libs/getChat";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Message from "../page";
import { pusherClient } from "@/app/utils/pusher";

interface IdProps {
  id: string | undefined;
}
const Chat = () => {
  const [id, setId] = useState("");
  const [messageId,setMessageId] = useState("")
  const [inputValue,setInputValue] = useState("")
  const [messages,setMessages] = useState<MessageProps[] | undefined >([])
  
  const { status, data: session } = useSession();

  const { data, isError, isLoading } = useQuery<ChatProps | undefined>({
    queryKey: ["Chat", session?.user.id],
    queryFn: () => {
      if (session?.user.id && id) {
        return getChat(session.user.id, id);
      }
    },
    enabled: !!session?.user.id && !!id,
    refetchOnMount: false,
  });

  useEffect(() => {
    const searchId = window.location.search;
    const id = searchId.slice(4);
    setId(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);






  const submitHandler = async(e:any) =>{
    e.preventDefault()
   try{
    const fetchMessage = await fetch("/api/message",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        context:inputValue,
        image:"",
        chatId:data?.id,
        userId:session?.user.id,
      })
    })
    const gettingMessage = await fetchMessage.json()
    setMessageId(gettingMessage.id)
    console.log(fetchMessage)
    setInputValue("")
   }catch(error){
    throw error
  }
  }

  // useEffect(()=>{
  //   if(data){
  //     setMessages(data?.message)
  //   }
  //   pusherClient.subscribe(messageId)
  //   const handlePusherMessage =(incommingMessage: MessageProps) =>{
  //     setMessages((prev:any) => [...prev,incommingMessage])
  //   }
  //   pusherClient.bind("message",handlePusherMessage)
  //   return ()=>{
  //     pusherClient.unsubscribe(messageId)
  //     pusherClient.unbind("message",handlePusherMessage)
  //   }
  // },[messageId])

  return (
    <div>
      <div className="w-[1600px]  bg-slate-500 p-2 rounded-2xl">
        <div className="flex items-center gap-3">
          <img
            src=""
            alt="Image"
            className="w-12 h-12 rounded-full bg-red-500"
          />
          <h1 className="flex flex-col"></h1>
        </div>
        <div className="h-[800px] mt-7">
          {data?.message.map((eachMessage) => {
            return (
              <div
                key={eachMessage.id}
                className="flex justify-between flex-col"
              >
                <div
                  className={
                    eachMessage.userId == session?.user.id
                      ? "mt-4 p-3 flex justify-end "
                      : "w-fit mt-4"
                  }
                >
                  <h1
                    className={
                      eachMessage.userId == session?.user.id
                        ? "bg-blue-600 p-3 rounded-3xl"
                        : " bg-slate-800 p-3 rounded-3xl"
                    }
                  >
                    {eachMessage.context}{" "}
                    {eachMessage.image ? ( <img src={eachMessage.image} alt="" className="w-30 h-28" />) : ""}
                  </h1>
                </div>
             
              </div>
            );
          })}
        </div>
        <div className="flex justify-center text-center items-center gap-3">
          <form onSubmit={(e)=> submitHandler(e)} className="flex text-center items-center gap-4">
          <h1>Logo</h1>
          <input
            type="Whats In Your Mind?"
            className="bg-slate-700 p-3 w-[500px] outline-none rounded-3xl"
            onChange={(e)=> setInputValue(e.target.value)}
            value={inputValue}
          />
          <button type="submit">Logo</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
