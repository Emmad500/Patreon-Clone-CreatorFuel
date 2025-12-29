"use client";
import { useEffect, useState, use } from "react";
import { useSession } from "next-auth/react";
import { notFound, useSearchParams, useRouter } from "next/navigation";

export default function CreatorPage({ params }) {
    const { username } = use(params);
    const [creator, setCreator] = useState(null);
    const [amount, setAmount] = useState(10);
    const [message, setMessage] = useState("");
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        fetchCreator();
    }, []);

    const fetchCreator = async () => {
        const res = await fetch(`/api/user/${username}`);
        if (res.status === 404) {
            setCreator(null);
        } else {
            const data = await res.json();
            setCreator(data);
        }
    };

    const fetchPayments = async () => {
        try {
            console.log("Fetching payments for:", username);
            const res = await fetch(`/api/payment/${username}`, { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                console.log("Payments fetched:", data);
                setPayments(data);
            } else {
                console.error("Failed to fetch payments");
            }
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([fetchCreator(), fetchPayments()]);
            setLoading(false);

            // Check for payment success
            // Wait for session to load so we don't save as "Anonymous" if logged in
            if (searchParams.get('payment') === 'success' && status !== "loading") {
                console.log("Payment success detected!");
                await fetch('/api/payment/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to_user: username,
                        amount: searchParams.get('amount') || 10,
                        message: searchParams.get('message') || "Support",
                        name: session?.user?.name || "Anonymous"
                    })
                });
                // Refresh payments
                await fetchPayments();
                // Clear URL param
                router.replace(`/${username}`);
            }
        };
        loadData();
    }, [searchParams, status]);

    if (loading) return <div className="text-center mt-20 text-white">Loading...</div>;
    if (!creator) return <div className="text-center mt-20 text-white">User not found</div>;

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Cover Image */}
            <div className="h-64 bg-gradient-to-r from-gray-800 to-gray-900 relative">
                {creator.coverImage && (
                    <img src={creator.coverImage} alt="Cover" className="w-full h-full object-cover opacity-50" />
                )}
                <div className="absolute -bottom-16 left-0 right-0 flex justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-gray-950 overflow-hidden bg-gray-800">
                        <img
                            src={creator.profilePicture || "https://github.com/shadcn.png"}
                            alt={creator.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-20 pb-12 text-center">
                <h1 className="text-3xl font-bold">{creator.name}</h1>
                <p className="text-gray-400">@{creator.username}</p>
                <p className="mt-4 text-gray-300 max-w-2xl mx-auto">{creator.bio || "No bio yet."}</p>

                <div className="mt-8 text-sm text-gray-500">
                    {creator.payfastId ? (
                        <span className="text-green-400">Accepting Payments</span>
                    ) : (
                        <span className="text-yellow-500">Payments not configured (Using Sandbox)</span>
                    )}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                {/* Supporters List */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <h2 className="text-xl font-bold mb-4">Recent Supporters</h2>
                    <div className="space-y-4">
                        {payments.length === 0 ? (
                            <p className="text-gray-400 italic">Be the first to support {creator.name}!</p>
                        ) : (
                            payments.map((payment, i) => (
                                <div key={i} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                                    <div>
                                        <span className="font-bold text-purple-400">{payment.name}</span>
                                        <span className="text-gray-400 text-sm ml-2">donated <span className="font-bold text-white">Rs. {payment.amount}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {payment.message && <span className="text-gray-400 text-sm italic">"{payment.message}"</span>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <h2 className="text-xl font-bold mb-4">Support {creator.name}</h2>

                    <form action="https://sandbox.payfast.co.za/eng/process" method="POST" className="space-y-4">
                        <input type="hidden" name="merchant_id" value={creator.payfastId || "10000100"} />
                        <input type="hidden" name="merchant_key" value={creator.payfastSecret || "46f0cd694581a"} />
                        <input type="hidden" name="return_url" value={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/${username}?payment=success&amount=${amount}&message=${encodeURIComponent(message)}`} />
                        <input type="hidden" name="cancel_url" value={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/${username}?payment=cancel`} />
                        <input type="hidden" name="notify_url" value={`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/payfast/notify`} />
                        <input type="hidden" name="custom_str2" value={username} />

                        <input type="hidden" name="item_name" value={`Support for ${creator.name}`} />

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Amount (Rs)</label>
                            <input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                min="5"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                name="custom_str1" // Using custom field for message
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Say something nice..."
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                                rows="3"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={false}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Pay with Payfast
                        </button>
                    </form>

                    {!creator.payfastId && (
                        <p className="text-xs text-yellow-400 mt-2">Using default Payfast Sandbox account for testing.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
