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



// export async function GET(){
//     try{
//         const getComments = await prisma.comment.findMany({
//             include:{
//                 user:true
//             }
//         })
//         console.log(getComments,"this is comments")
//         return NextResponse.json(getComments)
//     }catch(error){
//         throw error
//     }
// }