import { NextResponse } from "next/server"
import prisma from "/src/app/utils/prismadb"





export async function GET(req,{params}){
    try{
        const {id} = params
        console.log(id)
        const eachComment = await prisma.comment.findMany({
            where:{         
                    id:id
            }
        })
        console.log(eachComment)
        return NextResponse.json(eachComment)
    }catch(error){
        throw error
    }
}