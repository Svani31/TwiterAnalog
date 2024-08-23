import {v2 as cloudinary} from "cloudinary"
import { NextResponse } from "next/server"


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET (){
    try{
        const respons = await cloudinary.search.expression("").execute()
        console.log(respons)
        return NextResponse.json(respons)
    }catch(error){
        throw error
    }
}
