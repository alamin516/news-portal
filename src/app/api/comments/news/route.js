import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


export async function GET(req, res){
    try {
        const {searchParams} = new URL(req.url);
        const postID = searchParams.get("postID");

        const prisma = new PrismaClient();

        const result = await prisma.comments.findMany({
            where: {postID: parseInt(postID)},
            include: {users: {select: {firstName: true, lastName: true}}},

        })

        if(result.length <= 0){
            return NextResponse.json({status: "fail", message: "No comments found with this post id."})
        }

        return NextResponse.json({status: "success", data: result})
        
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({status: "fail", message:"Internal server error"})
    }
}