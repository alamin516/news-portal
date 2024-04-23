import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    let reqBody = await req.json();
    const prisma = new PrismaClient();

    const isSubscribed = await prisma.subscribers.findUnique({
      where: {email: reqBody.email}
    })

    if(isSubscribed){
      return NextResponse.json({ status: "fail", message:"This email already used!" });
    }


    const result = await prisma.subscribers.create({
      data: reqBody,
    });

    

    
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
