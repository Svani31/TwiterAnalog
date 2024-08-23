import { NextResponse } from "next/server"
import prisma from "@/app/utils/prismadb"





export async function POST(req){
    try{
       const {id,image} = await req.json()
       console.log(id,image)
        const respons = await prisma.user.update({
            where:{
                id:id
            },
            data:{
                image:image
            }
        })
        console.log(respons)

        return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}