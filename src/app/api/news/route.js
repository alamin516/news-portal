import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req, res) {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = new URL(req.url).searchParams;

    console.log( page, limit, sortBy, sortOrder)

    const prisma = new PrismaClient();

    const result = await prisma.news_list.findMany({
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
      orderBy: {
        [sortBy]: sortOrder,
      }
    });

    const totalRecords = await prisma.news_list.count();
    
    const totalPages = Math.ceil(totalRecords / limit);

    return NextResponse.json({ status: 'success', data: result, pagination: { page: parseInt(page), totalPages, totalRecords } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 'failed',
      message: 'Internal server error',
    });
  }
}
