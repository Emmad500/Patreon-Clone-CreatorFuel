import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { username } = await params;
    await connectDB();
    const user = await User.findOne({ username: username }).select("-password -email -createdAt -updatedAt");

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}
