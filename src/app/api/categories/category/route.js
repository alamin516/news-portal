import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();

    if (!reqBody.name) {
      return NextResponse.json({
        status: "failed",
        message: "Missing required field 'name'",
      });
    }
    const prisma = new PrismaClient();

    const slug = reqBody.name.toLowerCase().replace(/\s+/g, "-");

    const existingCategory = await prisma.categories.findUnique({
      where: { slug },
    });
    if (existingCategory) {
      return NextResponse.json({
        status: "failed",
        message: "Slug already exists",
      });
    }

    const result = await prisma.categories.create({
      data: { ...reqBody, slug },
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

export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const id = searchParams.get("id");

    //   if (!id) {
    //     return NextResponse.json({ status: "failed", message: "Route not found" });
    //   }

    //   if (isNaN(parseInt(id))) {
    //     return NextResponse.json({ status: "failed", message: "Invalid ID format (must be a number)" });
    //   }

    const prisma = new PrismaClient();

    const result = await prisma.categories.findUnique({
      where: {id: parseInt(id)},
    });

    if (!result) {
        return NextResponse.json({ status: "failed", message: "Category not found" });
    }

    return NextResponse.json({ status: "success", data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "failed",
      message: "Internal server error",
    });
  }
}

export async function PUT(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let id = searchParams.get("catId");

    const reqBody = await req.json();

    const slug = reqBody.name.toLowerCase().replace(/\s+/g, "-");

    const existingCategory = await prisma.categories.findUnique({
      where: { slug },
    });
    
    if (existingCategory) {
      return NextResponse.json({
        status: "failed",
        message: "Slug already exists",
      });
    }

    const result = await prisma.categories.update({
      where: { id: parseInt(id) },
      data: { ...reqBody, slug },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}

export async function DELETE(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let id = searchParams.get("catId");

    const result = await prisma.categories.delete({
      where: { id: parseInt(id) },
    });

    if (!result) {
      return NextResponse.json({
        status: "failed",
        message: "Category not found",
      });
    }

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
