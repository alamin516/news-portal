import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    const {searchParams} = new URL(req.url);
    const catID =searchParams.get("catID");

    const result = await prisma.news_list.findMany({
      where: {catID: parseInt(catID)},
      select:{id:true,title:true,short_des:true,img1:true,img2:true,img3:true,img4:true,createdAt:true}
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
