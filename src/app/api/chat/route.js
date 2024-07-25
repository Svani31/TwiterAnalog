import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb";

export async function POST(req) {
  try {
    const { myUserId, reciverUserId } = await req.json();
    console.log(myUserId, reciverUserId);

    // Corrected condition for OR clause
    const findChat = await prisma.chat.findFirst({
      where: {
        OR: [
          { myUserId: myUserId, reciverUserId: reciverUserId },
          { myUserId: reciverUserId, reciverUserId: myUserId },
        ],
      },
      include: {
        myChat:true,
        secondUserChat:true,
        message: true,

      },
    });

    if (findChat) return NextResponse.json(findChat);
    console.log(findChat);

    const createdChat = await prisma.chat.create({
      data: {
        myUserId,
        reciverUserId,
      },
    });

    console.log(createdChat);
    return NextResponse.json(createdChat);
  } catch (error) {
    console.error("Error in POST /api/chat:", error);
    return NextResponse.error(); // Ensure a proper error response
  }
}
