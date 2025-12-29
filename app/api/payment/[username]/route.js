import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
    // Next.js 15: params is a Promise, must await it!
    const { username } = await params;
    console.log("API: Fetching payments for user:", username);
    await connectDB();

    // Find payments where to_user matches the username, sorted by newest first
    const payments = await Payment.find({ to_user: username, done: true })
        .sort({ createdAt: -1 })
        .limit(10);

    console.log(`API: Found ${payments.length} payments for ${username}`);
    return NextResponse.json(payments);
}
