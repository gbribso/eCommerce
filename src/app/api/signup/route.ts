import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient

export async function POST(req: Request) {
  try {
    const { firstName, lastName, birthDate, email, password, confirmPassword } = await req.json();

    /* Password Validation */
    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match!" }, { status: 400 });
    }

    /* Hashing the Password Before to Saving It */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* Create a User */
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}