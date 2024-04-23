import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { SendEmail } from "@/utility/EmailVerify";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let email = searchParams.get("email");
    const count = await prisma.users.count({
      where: { email: email },
    });

    if (count === 1) {
      let code = Math.floor(100000 + Math.random() * 900000);
      let EmailText = `${code}`;
      let EmailSubject = `Blog Portal Verification Code`;

      await SendEmail(email, EmailText, EmailSubject);

      await prisma.users.update({
        where: { email: email },
        data: { otp: code.toString() },
      });

      return NextResponse.json({ status: "success", data: "6 Digit OTP Code has been sent to your email" });
    } else {
      return NextResponse.json({ status: "fail", data: "No User Found" });
    }
  } catch (e) {
    return NextResponse.json({ status: "failed", data: e });
  }
}
