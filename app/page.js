"use client";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Payments",
      desc: "Get paid instantly with our secure and optimized payment processing system.",
      color: "purple"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Fan Connection",
      desc: "Build a loyal community and engage with your supporters like never before.",
      color: "pink"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      desc: "Your data and earnings are protected with enterprise-grade security.",
      color: "blue"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-32 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 drop-shadow-lg"
        >
          Fuel Your Creativity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-8"
        >
          A premium platform for creators to connect with fans and get funded.
          Start your journey today and turn your passion into a profession.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-bold text-lg hover:scale-105 transition-all duration-500 ease-in-out flex items-center gap-2 cursor-pointer">
            Start Creating <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/explore" className="px-8 py-4 bg-gray-800 rounded-full font-bold text-lg hover:bg-gray-700 transition-colors border border-gray-700 cursor-pointer">
            Explore Creators
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transform: hoveredIndex === index ? "scale(1.03)" : "scale(1)",
                  transition: "all 0.3s ease-in-out",
                  borderColor: hoveredIndex === index ? (feature.color === "purple" ? "#a855f7" : feature.color === "pink" ? "#ec4899" : "#3b82f6") : "#374151",
                  boxShadow: hoveredIndex === index ? `0 20px 25px -5px ${feature.color === "purple" ? "rgba(168, 85, 247, 0.5)" : feature.color === "pink" ? "rgba(236, 72, 153, 0.5)" : "rgba(59, 130, 246, 0.5)"}` : "none",
                  zIndex: hoveredIndex === index ? 50 : 1
                }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 cursor-pointer relative"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.color === "purple" ? "bg-purple-900/50 text-purple-400" :
                  feature.color === "pink" ? "bg-pink-900/50 text-pink-400" :
                    "bg-blue-900/50 text-blue-400"
                  }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
