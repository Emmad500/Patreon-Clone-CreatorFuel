import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import User from '@/models/User';
import connectDB from '@/lib/db';

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await connectDB();
                const user = await User.findOne({ email: credentials.email });
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "github" || account.provider === "google") {
                await connectDB();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                        name: user.name, // Added name field
                        image: user.image, // Added image field
                    });
                    await newUser.save();
                }
            }
            return true;
        },
        async session({ session, user, token }) {
            await connectDB();
            const dbUser = await User.findOne({ email: session.user.email });
            if (dbUser) {
                session.user.name = dbUser.username;
                session.user.id = dbUser._id; // Add user ID to session
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
