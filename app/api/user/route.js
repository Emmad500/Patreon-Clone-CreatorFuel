import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    return NextResponse.json(user);
}

export async function PUT(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    // Validate username uniqueness if changing
    if (data.username) {
        const existingUser = await User.findOne({ username: data.username });
        if (existingUser && existingUser.email !== session.user.email) {
            return NextResponse.json({ error: "Username already taken" }, { status: 400 });
        }
    }

    const user = await User.findOneAndUpdate(
        { email: session.user.email },
        data,
        { new: true }
    );

    return NextResponse.json(user);
}
