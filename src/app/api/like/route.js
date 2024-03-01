import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb";

export async function POST(req) {
  try {
    const { userId,postId } = await req.json();
    const createLikeHandler = await prisma.like.create({
      data: {
        userId,
        postId
      },
    });
    console.log(createLikeHandler);
    return NextResponse.json(createLikeHandler);
  } catch (error) {
    throw error;
  }
}


export async function GET(){
    try{
        const getLikeHandler = await prisma.like.findMany({})
        console.log(getLikeHandler,"this is like handler")
        return NextResponse.json(getLikeHandler)
    }catch(error){
        throw error
    }
}