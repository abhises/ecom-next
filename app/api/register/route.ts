import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body); // ✅ Check if the body is coming correctly

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword); // ✅ Check if hashing is working

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword, // ✅ Ensure field matches Prisma schema
      },
    });

    console.log("User created:", user); // ✅ Check Prisma response

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in POST /api/register:", error);

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
