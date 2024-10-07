import React, { useEffect, useState } from 'react'
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import Person2Icon from "@mui/icons-material/Person2";
import Link from 'next/link';
import Button from '@/app/HOC/button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


function HeaderList() {
    const [user, setUser] = useState<SessionProps | null>(null);
    const { data: session, status } = useSession<any>();
    const asideMenuText = [
        { icon: <HomeIcon />, text: "Home", id: 0 },
        { icon: <NotificationsIcon />, text: "Notifications", id: 1 },
        { icon: <EmailIcon />, text: "Messages", id: 2 },
        { icon: <Person2Icon />, text: "Profile", id: 3 },
      ];
      const route = useRouter();


      useEffect(() => {
        setUser(session?.user as SessionProps | null);
      //  if(!session) route.push("/")
      }, [session]);

  return (
    <div className='pl-8 sm:hidden md:hidden md:w-[300px] lg:block  lg:w-[300px] xl:w-[400px]'>
      <aside className="">
    <nav className="fixed">
      <ul className="flex flex-col gap-8 m-2 text-2xl">
        <div className=''>
          <Link href={"/components/main"}>
            <svg
              className='w-10 h-10'
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
              <Link href={`${textEl.text}`}>
              <span className="mr-4">{textEl.icon}</span> {textEl.text}
              </Link>
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
        <img className=" w-10 h-10 rounded-3xl " src={user?.image} alt="image" />
        <div className="flex gap-4 ">
          <div className="flex flex-col ">
            <span className=''>{user?.name}</span>
            <span className=''>@{user?.email}</span>
          </div>
        </div>
        <span>...</span>
      </div>
      <button onClick={() => signOut()}>Sign out</button>
    </nav>
  </aside>
    </div>
  )
}

export default HeaderList