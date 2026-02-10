import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security reasons, don't reveal if user exists or not
      return NextResponse.json({ message: "Reset link sent if account exists" });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

    // MOCK EMAIL SENDING
    console.log("-----------------------------------------");
    console.log(`PASSWORD RESET REQUEST FOR: ${email}`);
    console.log(`RESET URL: ${resetUrl}`);
    console.log("-----------------------------------------");

    return NextResponse.json({ message: "Reset link sent successfully" });
  } catch (error) {
    console.error("Forgot Password API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
