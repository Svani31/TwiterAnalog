import Button from "@/app/HOC/button";
import Link from "next/link";
import React from "react";

function MainPage() {
  const asideMenuText = [
    { icon: "Icon", text: "Home", id: 0 },
    { icon: "Icon", text: "Notifications", id: 1 },
    { icon: "Icon", text: "Messages", id: 2 },
    { icon: "Icon", text: "Profile", id: 3 },
  ];

  return (
    <div className="bg-black">
      <div className="pl-12">
        <aside className=" max-w-72 border-r-2 p-3 border-gray-600">
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
              {/* <li>Home</li>
              <li>Notifications</li>
              <li>Messages</li>
              <li>Profile</li> */}
              {asideMenuText.map((textEl) => {
                return (
                  <li
                    className=" hover:bg-gray-600 w-fit p-2 rounded-3xl cursor-pointer"
                    key={textEl.id}
                  >
                    <span>{textEl.icon}</span> {textEl.text}
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
            <div className="flex justify-between mt-20 text-center items-center hover:bg-gray-500 rounded-3xl">
                <div className="flex gap-4">
                  User image
              <div className="flex flex-col">
                <span>name</span>
                <span>name</span>
              </div>
                </div>
              <span>...</span>
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default MainPage;
