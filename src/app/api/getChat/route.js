import { NextResponse } from "next/server"
import prisma from "/src/app/utils/prismadb"


export async function POST(req){
    try{
        const {myUserId,reciverUserId} = await req.json()
        console.log(myUserId,reciverUserId)
        const respons = await prisma.chat.findFirst({
            where:{
                OR:[
                    {myUserId:myUserId,reciverUserId:reciverUserId},
                    {myUserId:reciverUserId,reciverUserId:myUserId}
                ]
            },
            include:{
                message:true,
            }
        })
        return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}

export async function GET(){
    try{
        const respons = await prisma.chat.findMany({
            include:{
                message:true
            }
        })
        return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}