import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    const reqBody = await req.json();

    let uniqueSlug = reqBody.title.toLowerCase().replace(/\s+/g, "-");
    let existingItem = await prisma.news_list.findUnique({
      where: { slug: uniqueSlug },
    });

    let count = 1;
    while (existingItem) {
      uniqueSlug = `${uniqueSlug}-${count}`;
      existingItem = await prisma.news_list.findUnique({
        where: { slug: uniqueSlug },
      });
      count++;
    }

    const result = await prisma.news_list.create({
      data: { ...reqBody, slug: uniqueSlug },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    console.error(error);
    let errorMessage = "Internal server error";
    if (error.code === 'P2002') {
      errorMessage = "Slug is already in use. Please choose a different title.";
    }
    return NextResponse.json({ status: "failed", message: errorMessage });
  }
}



export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");

    const prisma = new PrismaClient();

    const result = await prisma.news_list.findUnique({
      where: {id: parseInt(id) },
      include: { categories: true },
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

export async function DELETE(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    const result = await prisma.news_list.delete({
      where: { id: parseInt(id) },
    });

    if (!result) {
      return NextResponse.json({
        status: "failed",
        message: "News not found",
      });
    }
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
