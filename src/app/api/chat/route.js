import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb";

export async function POST(req) {
  try {
    const { myUserId, reciverUserId } = await req.json();
    const findChat = await prisma.chat.findMany({
      where: {
        OR: [
          { myUserId: myUserId, reciverUserId: reciverUserId },
          { myUserId: reciverUserId, reciverUserId, myUserId },
        ],
      },
    });
    if (findChat.length > 0) return NextResponse.json(findChat);
    console.log(findChat);

    const createdChat = await prisma.chat.create({
      data: {
        myUserId,
        reciverUserId,
      },
    });
    return NextResponse.json(createdChat);
  } catch (error) {
    throw error;
  }
}
