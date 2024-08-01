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

