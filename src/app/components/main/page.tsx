/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Button from "@/app/HOC/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import Person2Icon from "@mui/icons-material/Person2";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Post from "./post";
import AsideMenu from "./asideMenu";


function MainPage() {
  const [user, setUser] = useState<SessionProps | null>(null);
  const { data: session, status } = useSession<any>();
  // console.log(session)
  const route = useRouter();
  const asideMenuText = [
    { icon: <HomeIcon />, text: "Home", id: 0 },
    { icon: <NotificationsIcon />, text: "Notifications", id: 1 },
    { icon: <EmailIcon />, text: "Messages", id: 2 },
    { icon: <Person2Icon />, text: "Profile", id: 3 },
  ];

  useEffect(() => {
    setUser(session?.user as SessionProps | null);
    if (session) {
      route.push("/components/main");
    } else {
      route.push("/");
    }
    console.log(user)
    console.log(session)
  }, [session]);

  return (
    <div className="bg-black flex w-full ">
      <div className="pl-8">
        <aside className=" max-w-72 border-r p-6 border-gray-600">
          <nav className="">
            <ul className="flex flex-col gap-8 m-2 text-2xl">
              <div>
                <Link href={"/components/main"}>
                  <svg
                    style={{ width: "40px", height: "40px" }}
                    viewBox="0 0 30 30"
                  >
                    <path
                      style={{ fill: "white" }}
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </Link>
              </div>

              {asideMenuText.map((textEl) => {
                return (
                  <li
                    className=" hover:bg-gray-600 w-fit p-2 rounded-3xl cursor-pointer flex"
                    key={textEl.id}
                  >
                    <span className="mr-4">{textEl.icon}</span> {textEl.text}
                  </li>
                );
              })}
            </ul>
            <div
              style={{ background: "rgb(29, 155, 240)" }}
              className="p-3 rounded-3xl text-center cursor-pointer mt-7"
            >
              <Button text="Post" style={"text-white"} />
            </div>
            <div className="flex justify-between mt-20 text-center items-center hover:bg-gray-500 rounded-3xl p-2">
              <img className=" w-10 h-10" src={user?.image} alt="image" />
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span>{user?.name}</span>
                  <span>@{user?.email}</span>
                </div>
              </div>
              <span>...</span>
            </div>
          </nav>
        </aside>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      <Post />
      <div className="flex justify-center w-full">
        <AsideMenu />
      </div>
    </div>
  );
}

export default MainPage;
