import { NextResponse } from "next/server"
import prisma from "/src/app/utils/prismadb"




export async function GET(req,{params}){
    try{
        const {id} = await params
        console.log(id)
        const findPost = await prisma.post.findUnique({
            where:{
                    id:id      
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
        })
        console.log(findPost)
        return NextResponse.json(findPost)
    }catch(error){
        throw error
    }
}