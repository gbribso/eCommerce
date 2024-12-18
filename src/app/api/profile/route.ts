import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("auth-token");

    /* If no token is found or token is invalid, respond with an error message */
    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const token = tokenCookie.value;

    /* Verifying the token and treating the response as 'unknown' type */
    const decoded = jwt.verify(token, JWT_SECRET) as unknown;

    /* Ensuring that the decoded token is of the expected type */
    if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
      const decodedToken = decoded as JwtPayload & { userId: string };
      const userId = decodedToken.userId;

      /* If the 'id' field in the database is a number, convert it to a number */
      const userIdNumber = parseInt(userId, 10);

      /* Fetching user data from the database using the userId as a number in the query */
      const user = await prisma.user.findUnique({
        where: { id: userIdNumber },
      });

      // If the user is not found, return an error message */
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      /* Return the user data if found */
      return NextResponse.json({ user });
    } else {
      /* If the token is invalid or doesn't contain the expected information, return an error */
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  } catch (error) {
    /* Log any errors that occur during the authentication or user fetch process */
    console.error("Error occurred during authentication or user fetch:", error);
    return NextResponse.json({ message: "Error fetching user data", error }, { status: 500 });
  }
}
