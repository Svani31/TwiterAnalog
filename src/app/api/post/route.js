import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb";
import {pusherServer} from "@/app/utils/pusher"
export async function POST(req) {
  try {
    const { content, userId } = await req.json();
    const createPost = await prisma.post.create({
      data: {
        content,
        userId,
      },
      include:{
        user:true,
        like:true,
        comment:{
          include:{
            user:true
          }
        }
      }
    });
    pusherServer.trigger(userId,"creating-post",createPost)
    return NextResponse.json(createPost);
  } catch (err) {
    throw err;
  }
}

export async function GET(){
  try{
    const getAllPost = await prisma.post.findMany({
      include:{
        comment:true,
        user:true,
        like:true,
      }
    })
    return NextResponse.json(getAllPost)
  }catch(error){
    throw error
  }
}


