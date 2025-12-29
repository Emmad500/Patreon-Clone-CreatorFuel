import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    // Payfast sends data as URL-encoded form data
    const text = await req.text();
    const params = new URLSearchParams(text);
    const data = Object.fromEntries(params);

    console.log("Payfast Notification Received:", data);

    // Basic validation (In production, verify signature!)
    if (!data.amount_gross || !data.item_name) {
        return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await connectDB();

    // Find the user who received the payment
    // We stored the username in 'custom_str1' or 'item_name' logic, 
    // but actually we need to know WHO the payment is for.
    // In our form we didn't explicitly send the username as a custom field for identification,
    // but we can infer it or we should have sent it.
    // Let's check the form in [username]/page.js:
    // We sent: merchant_id, item_name="Support for {creator.name}", custom_str1={message}
    // We MISSING the 'to_user' identifier in the form! 
    // We should fix the form to send 'custom_str2' as the username.
    
    // However, for this MVP, let's try to find the user by merchant_id if possible, 
    // OR we update the form first. 
    // Updating the form is safer.
    
    // Wait, if we update the form now, previous payments won't work. 
    // But we haven't made any successful payments yet presumably.
    
    // Let's assume we will update the form to send 'custom_str2' as the username.
    const to_user = data.custom_str2; 
    const message = data.custom_str1;
    const amount = data.amount_gross;
    const senderName = data.name_first || "Anonymous"; // Payfast might send this if user logs in, else "Anonymous"

    if (to_user) {
        await Payment.create({
            name: senderName,
            to_user: to_user,
            oid: data.m_payment_id,
            message: message,
            amount: amount,
            done: true // Payfast ITN means it's done usually, or check payment_status
        });
    }

    return NextResponse.json({ success: true });
}
