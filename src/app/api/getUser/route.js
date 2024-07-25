import { NextResponse } from "next/server"
import prisma from "/src/app/utils/prismadb"



export async function POST(body){
    try{
        const {userId} = await body.json()
        const findUser = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        return NextResponse.json(findUser)
    }catch(error){
        throw error
    }
}