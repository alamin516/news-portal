import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    let reqBody = await req.json();
    reqBody.otp = "0";

    const prisma = new PrismaClient();

    const existEmail = await prisma.users.findUnique({
      where: {email: reqBody.email}
    })

    if(existEmail){
      return NextResponse.json({status: 'failed', message: "Email already exist"} )
    }


    const result = await prisma.users.create({
      data: reqBody,
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
