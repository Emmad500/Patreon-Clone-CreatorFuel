"use client";
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu, X, Coffee } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 font-bold text-xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            <Coffee className="text-pink-500" />
                            CreatorFuel
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link href="/" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                                Home
                            </Link>
                            <Link href="/explore" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                                Explore
                            </Link>
                            <Link href="/about" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                                About
                            </Link>
                            <Link href="/contact" className="hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
                                Contact
                            </Link>

                            {session ? (
                                <div className="relative ml-3">
                                    <div>
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="flex items-center gap-2 max-w-xs bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-1 pr-3 cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700"
                                        >
                                            <img
                                                className="h-8 w-8 rounded-full object-cover"
                                                src={session.user.image || "https://github.com/shadcn.png"}
                                                alt=""
                                            />
                                            <span className="text-sm font-medium text-gray-200">{session.user.name}</span>
                                        </button>
                                    </div>
                                    {isOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700 z-50">
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href={`/${session.user.name}`}
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                My Page
                                            </Link>
                                            <button
                                                onClick={() => signOut()}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 cursor-pointer"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => signIn()}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                                >
                                    Login / Sign Up
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none cursor-pointer"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-900 border-b border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link href="/explore" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                            Explore
                        </Link>
                        <Link href="/about" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                            About
                        </Link>
                        <Link href="/contact" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                            Contact
                        </Link>
                        {session ? (
                            <>
                                <div className="border-t border-gray-800 my-2 pt-2">
                                    <div className="flex items-center px-3 mb-3">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={session.user.image || "https://github.com/shadcn.png"} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{session.user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400 mt-1">{session.user.email}</div>
                                        </div>
                                    </div>
                                    <Link href="/dashboard" className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <Link href={`/${session.user.name}`} className="block hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                                        My Page
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full text-left bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium cursor-pointer mt-2"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="block w-full text-left bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                            >
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
