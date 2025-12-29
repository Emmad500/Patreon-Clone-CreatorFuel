import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String }, // For credentials provider
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // Creator specific fields
    razorpayId: { type: String },
    razorpaySecret: { type: String },
    payfastId: { type: String }, // Added for Payfast simulation
    payfastSecret: { type: String },
    bio: { type: String },
    coverImage: { type: String },
    profilePicture: { type: String },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
