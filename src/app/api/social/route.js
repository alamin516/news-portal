import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();

    const result = await prisma.socials.findMany();

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}


export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();

    const reqBody = await req.json();
    console.log(reqBody)
    const result = await prisma.socials.create({
      data: reqBody
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

    const existingRecord = await prisma.socials.findUnique({
      where: {
        id: parseInt(id) 
      }
    });

    if (!existingRecord) {
      return res.status(404).json({ status: "failed", error: "Record not found" });
    }

    const updatedRecord = await prisma.socials.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    });

    return NextResponse.json({ status: "success", data: updatedRecord });
  } catch (e) {
    NextResponse.json({ status: "failed", error: e.message });
  }
}
