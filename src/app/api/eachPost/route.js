import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb";



export async function GET(req){
    try{
        const {searchParams} = new URL(req.url)
        const id = searchParams.get("id")
        console.log(searchParams)
        console.log( id)
        const findPost = await prisma.post.findUnique({
            where:{
                id:id
            },
            include:{
                comment:true,
                like:true,
                user:true
            }
        })
        console.log(findPost)
        return NextResponse.json(findPost)
    }catch(error){
        throw error
    }


  }