import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    console.log("Creating payment with data:", data);
    await connectDB();

    const payment = await Payment.create({
        name: data.name || "Supporter",
        to_user: data.to_user,
        oid: data.oid || Math.random().toString(36).substring(7),
        message: data.message || "Great work!",
        amount: Number(data.amount) || 50,
        done: true
    });

    console.log("Payment created in DB:", payment);
    return NextResponse.json(payment);
}
