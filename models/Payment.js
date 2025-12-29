import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Sender name
    to_user: { type: String, required: true }, // Username of receiver
    oid: { type: String, required: true }, // Order ID
    message: { type: String },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
