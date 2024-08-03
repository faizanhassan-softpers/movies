import { connectToDatabase } from "@/backend/lib/dbConnect";
import User from "@/backend/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const email = "johndoe@yopmail.com";
    const password = "12345678";

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "No user exists" }, { status: 200 });
    }

    return NextResponse.json(user);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { message: "Failed to get user", error: errorMessage },
      { status: 500 }
    );
  }
}
