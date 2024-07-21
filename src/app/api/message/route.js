import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb"


export async function POST(req) {
  try {
    const { context, image, chatId,userId } = await req.json();
    const respons = await prisma.message.create({
      data: {
        context,
        image,
        chatId,
        userId,
      },
    });
    return NextResponse.json(respons)
  } catch (error) {
    throw error;
  }
}
