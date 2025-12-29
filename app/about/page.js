"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6">
                        About CreatorFuel
                    </h1>
                    <p className="text-xl text-gray-400">
                        Empowering creators to turn their passion into a sustainable career.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-purple-500 transition-colors"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">Our Mission</h2>
                        <p className="text-gray-300 leading-relaxed">
                            At CreatorFuel, we believe that creativity should be rewarded. We provide a platform where artists, writers, developers, and creators of all kinds can connect directly with their audience and receive the support they need to keep creating. We are dedicated to building a transparent, creator-first ecosystem.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-pink-500 transition-colors"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-pink-400">Why Choose Us?</h2>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Direct support from your biggest fans.</li>
                            <li>Zero hidden fees on donations (we only take a small platform fee).</li>
                            <li>Global payment support including Payfast for South Africa/Pakistan regions.</li>
                            <li>Premium, customizable creator profiles.</li>
                        </ul>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}
