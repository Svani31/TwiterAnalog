"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function Avatar() {
  const [user, setUser] = useState<RegisterTypes[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_API_KEY}/api/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const getUser = await user.json();
        setUser(getUser);
      } catch (err) {
        throw err;
      }
    };
    getUser();
  }, []);

  return (
    <div className=" text-black">
      Image
      {user.map((eachIsser) => {
        return (
          <div key={eachIsser.id}>
            {/* <img src={eachIsser.image} alt="" /> */}
            <Image
              src={eachIsser.image}
              width={200}
              height={200}
              alt="Avatar"
            />
          </div>
        );
      })}
    </div>
  );
}

export default Avatar;
