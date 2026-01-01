# CreatorFuel 🚀

**CreatorFuel** is a modern, full-stack crowdfunding platform designed to help creators receive support from their audience. Built with **Next.js 15**, **MongoDB**, and **Tailwind CSS v4**, it features a premium glassmorphism UI and real-time payment simulation.

<img width="1353" height="521" alt="Screenshot 2025-12-30 191134" src="https://github.com/user-attachments/assets/b7ca7813-5048-444b-bbf6-566de2e529a2" />

## ✨ Key Features

- **💸 Real-Time Payments**: Integrated with **Payfast (Sandbox)** to simulate secure transactions.
- **⚡ Dynamic Supporter Wall**: Supporters' names and custom messages appear **instantly** on the creator's page after payment.
- **🎨 Premium UI/UX**: Designed with **Tailwind CSS v4**, featuring glassmorphism, smooth animations, and a sleek dark mode.
- **🔐 Secure Authentication**: Full login system using **NextAuth.js** (GitHub, Google, & Credentials).
- **📱 Fully Responsive**: Optimized for all devices, from mobile phones to large desktops.
- **⚡ High Performance**: Powered by **Next.js 15 App Router** for lightning-fast page loads.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS v4
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: NextAuth.js v4
- **Payments**: Payfast Integration (Sandbox Environment)

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/username/creatorfuel.git
cd creatorfuel
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_key
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# Payments (Payfast Sandbox)
NEXT_PUBLIC_PAYFAST_URL=https://sandbox.payfast.co.za/eng/process
NEXT_PUBLIC_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the repository in Vercel.
3.  Add the Environment Variables in the Vercel Dashboard.
4.  Click **Deploy**.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a Pull Request.

---

**Developed by Emmad**
