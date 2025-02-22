import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("Received password:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    console.log("Creating user with:", { name, email, hashedPassword });

    const user = await prisma.user.create({
      data: {
        name: name || "",
        email: email || "",
        hashedPassword: hashedPassword || "",
        emailVerified: null, // 🔥 Ensures Prisma doesn't reject null
      },
    });

    console.log("Created User:", user);

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Error in POST /api/register:",
      JSON.stringify(error, null, 2)
    );

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        // details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
