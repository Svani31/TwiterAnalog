import { NextResponse } from "next/server";
import prisma from "/src/app/utils/prismadb";

export async function POST(req) {
  try {
    const { name, email, password,image } = await req.json();
    const createUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        image,
      },
    });
    return NextResponse.json(createUser);
  } catch (err) {
    throw err;
  }
}

export async function GET() {
  try {
    const allUser = await prisma.user.findMany({
      include:{
        post:true,
        myChat:true,
        secondUserChat:true
      }
    });
    return NextResponse.json(allUser);
  } catch (error) {
    throw error;
  }
}
