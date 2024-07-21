import { useStore } from "@/app/utils/myContext";
import { useEffect, useState } from "react";
import "@/app/utils/styles/globals.css";
// importing mui items
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import MicIcon from "@mui/icons-material/Mic";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import GifBoxIcon from "@mui/icons-material/GifBox";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const UserChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatDown, setIsChatDown] = useState(false);
    const {usersId} = useStore()
    console.log(usersId,"this is user id")
    
    useEffect(()=>{
        const fetchData = async()=>{
            const respons = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/`)
        }
    },[usersId])


  return (
    <div
      style={{ position: "fixed", right: "150px", bottom: "0", width: "300px", }}
    >
      <div className="bg-gray-500 p-3 rounded-t-xl">
        <div className="flex justify-between">
          <div>Icon | Giorgi</div>
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
            <CloseIcon />
          </div>
        </div>
        <div className={isChatDown ? "hidden" : ""}>
          <div className="mt-5 mb-2 h-56 overflow-y-auto scrollbar-hide">
            <div className=" flex justify-end mt-4">
              <p className="bg-blue-500 p-2 rounded-2xl">rame</p>{" "}
            </div>
            <div className=" flex justify-end mt-4">
              <p className="bg-blue-500 p-2 rounded-2xl">rame</p>{" "}
            </div>
            <div className=" flex justify-end mt-4">
              <p className="bg-blue-500 p-2 rounded-2xl">rame</p>{" "}
            </div>
            
            <div className="flex  justify-start mt-4">
              <p className="bg-red-500 p-2 rounded-2xl">xou</p>
            </div>
            <div className="flex  justify-start mt-4">
              <p className="bg-red-500 p-2 rounded-2xl">xou</p>
            </div>
            <div className="flex  justify-start mt-4">
              <p className="bg-red-500 p-2 rounded-2xl">xou</p>
            </div>
            
          </div>
          <div className="flex">
            <div className="gap-1 flex">
              <MicIcon className=" fill-gray-800" />
              <BrokenImageIcon className=" fill-gray-800" />
              <GifBoxIcon  className=" fill-gray-800"/>
            </div>
            <div className="flex">
              <div className="bg-gray-800 rounded-2xl h-7 flex w-40 ml-2">
                <input className="outline-none bg-transparent ml-4" type="Aa" placeholder="Aa" />
              </div>
              <ThumbUpIcon className="ml-1 fill-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
