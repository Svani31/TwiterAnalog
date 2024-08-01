"use client";
import { useParams } from "next/navigation";
import AsideMenu from "../../main/asideMenu";
import HeaderList from "../../main/headerList";
import { useEffect, useState } from "react";

// mui icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface MediaBarType {
  Post:string,
  Replay:string,
  Highlights:string,
  Articles:string,
  Media:string
  Likes:string
}

const EachUser = () => {
  const [idUser, setIdUser] = useState<RegisterTypes>();
  const params = useParams();
  const [mediaBar,setMediaBar] = useState<any>(["Post", "Replay", "Highlights", "Articles", "Media", "Likes"])
 

  useEffect(() => {
    const fetchData = async () => {
      const respons = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/api/getUser`,
        {
          method: "POST",
          headers: {
            "Conten-Type": "application/json",
          },
          body: JSON.stringify({
            userId: params.id,
          }),
        }
      );
      const user = await respons.json();
      setIdUser(user);
    };
    fetchData();
  }, [params]);

  return (
    <div className="flex">
      <div>
        <HeaderList />
      </div>
      <div className="flex flex-col  border-l-2 border-gray-600 border-r-2">
        <div className="flex flex-row col gap-7 text-xl,l items-center mt-2">
          <ArrowBackIcon />
          <h1 className=" font-bold flex flex-col">
            Giorgi Ratiani{" "}
            <span className=" text-sm font-normal">153k post</span>
          </h1>
        </div>
        <div className=" relative">
          <img
            src={idUser?.image}
            style={{ width: "600px", height: "200px" }}
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
        <div className="mt-16 ml-4">
          <div>
            <h1>Giorgi Ratiani</h1>
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
            {/* <h1 className="">Post</h1>
            <h1 className="">Replay</h1>
            <h1 className="">Highlights</h1>
            <h1 className="">Articles</h1>
            <h1 className="">Media</h1>
            <h1 className="">Likes</h1> */}
            {mediaBar.map((eachMedia:any)=>{
              return(
                <>
                  <h1 className="cursor-pointer">{eachMedia}</h1>
                </>
              )
            })}
          </div>
        </div>
      </div>
      {/* <AsideMenu /> */}
    </div>
  );
};

export default EachUser;
