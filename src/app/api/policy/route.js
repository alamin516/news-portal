import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    const prisma = new PrismaClient();

    const result = await prisma.policies.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}

export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const searchParams =  url.searchParams;
    const type =  searchParams.get("type");
    
    const prisma = new PrismaClient();

    const result = await prisma.policies.findMany({ 
      where: {type: type}
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}


export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id')

    
    const reqBody = await req.json();
    const {...updateData } = reqBody;

    const updatedRecord = await prisma.policies.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    });
    return NextResponse.json({ status: "success", data: updatedRecord });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}