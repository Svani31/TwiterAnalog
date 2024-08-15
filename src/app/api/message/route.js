import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb"
import {pusherServer} from "/src/app/utils/pusher"

export async function POST(req) {
  try {
    const { context, image, chatId,userId } = await req.json();
    console.log(context,chatId,userId)
    const respons = await prisma.message.create({
      data: {
        context,
        image,
        chatId,
        userId,
      },
      include:{
        chat:true
      }
    });
    pusherServer.trigger(chatId,"message",respons)
    return NextResponse.json(respons)
  } catch (error) {
    throw error;
  }
}
