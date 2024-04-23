import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export async function GET(req, res) {
  try {
    let headerList = headers();
    let id = parseInt(headerList.get("id"));

    if(!id){
      return NextResponse.json({status: "fail", message: 'Please login before commenting.'})
    }

    
    const prisma = new PrismaClient();

    const result = await prisma.comments.findMany({
      where: { userID: id },
      include: {
        news_list: { select: { title: true } },
      },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req, res) {
  try {
    let headerList = headers();
    let id = parseInt(headerList.get("id"));

    if(!id){
      return NextResponse.json({status: "fail", message: 'Please login before commenting.'})
    }

    let reqBody = await req.json();
    reqBody.userID = id;

    const prisma = new PrismaClient();

    const result = await prisma.comments.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    console.log(e);
  }
}

export async function DELETE(req, res) {
  try {
    let headerList = headers();
    let user_id = parseInt(headerList.get("id"));


    let reqBody = await req.json();
    let comment_id = parseInt(reqBody['id']);

    const prisma = new PrismaClient();

    const result = await prisma.comments.deleteMany({
        where: {
            AND: [
                {userID: user_id},
                {id: comment_id}
            ]
        }
    })

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    console.log(e);
  }
}
