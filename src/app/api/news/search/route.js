import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res) {
  try {
    let { searchParams } = new URL(req.url);
    let keyword = searchParams.get("keyword");
    console.log(keyword)

    const prisma = new PrismaClient();
    const result = await prisma.news_list.findMany({
      where: { title: { contains: keyword } },
      select: {
        id: true,
        title: true,
        short_des: true,
        img1: true,
        img2: true,
        img3: true,
        img4: true,
        createdAt: true,
      },
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "failed",
      message: "Internal server error",
    });
  }
}
