import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    /* Verify if the User Already Has Ben Created */
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found."}, { status: 404 });
    }

    /* Verifies That the Password Matches the User */
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid Password"}, { status: 401 });
    }

    /* Generate a JWT Token */
    const token = jwt.sign(
      {userId: user.id, email: user.email},
      JWT_SECRET,
      { expiresIn: "1h"}
    )

    /* Token Cookie Configuration */
    const response = NextResponse.json({ message: "Login Successful"});
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    })
    return response

  } catch (error) {
    return NextResponse.json({ message: "Error logging in", error }, { status: 500 });
  }
}