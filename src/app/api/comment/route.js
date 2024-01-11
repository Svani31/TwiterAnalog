import {NextResponse} from "next/server"
import prisma from "/src/app/utils/prismadb"


export async function POST(req){
    try{
        const {userId,postId,context} = await req.json()
        const postComment = await prisma.comment.create({
            data:{
                userId,postId,context
            }
        })
        return NextResponse.json(postComment)

    }catch(error){
        throw error
    }
}