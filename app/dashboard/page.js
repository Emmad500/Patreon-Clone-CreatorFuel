"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        bio: "",
        payfastId: "",
        payfastSecret: "",
        razorpayId: "",
        razorpaySecret: "",
        profilePicture: "",
        coverImage: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated") {
            fetchUser();
        }
    }, [status, router]);

    const fetchUser = async () => {
        const res = await fetch("/api/user");
        const data = await res.json();
        setFormData({
            name: data.name || "",
            username: data.username || "",
            bio: data.bio || "",
            payfastId: data.payfastId || "",
            payfastSecret: data.payfastSecret || "",
            razorpayId: data.razorpayId || "",
            razorpaySecret: data.razorpaySecret || "",
            profilePicture: data.profilePicture || "",
            coverImage: data.coverImage || ""
        });
        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/user", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            alert("Profile updated successfully!");
        } else {
            alert("Error updating profile");
        }
    };

    if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 text-white">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl border border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div className="md:col-span-2 border-t border-gray-800 pt-6 mt-2">
                        <h3 className="text-xl font-semibold mb-4 text-purple-400">Payment Details</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Payfast Merchant ID (Simulation)</label>
                        <input
                            type="text"
                            name="payfastId"
                            value={formData.payfastId}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Payfast Secret</label>
                        <input
                            type="text"
                            name="payfastSecret"
                            value={formData.payfastSecret}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Razorpay ID</label>
                        <input
                            type="text"
                            name="razorpayId"
                            value={formData.razorpayId}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Razorpay Secret</label>
                        <input
                            type="text"
                            name="razorpaySecret"
                            value={formData.razorpaySecret}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-500 ease-in-out cursor-pointer"
                    >
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
}
