# ⚡ SnapLink (SmartDeepLink)

> **The Open Native App Intent Engine & Smart Deep Linking Infrastructure.**  
> Bypass in-app browser login walls, open links directly in native mobile apps (YouTube, Instagram, Amazon, Telegram), generate high-resolution dynamic QR codes, and preserve 100% of affiliate conversions.

---

## 🌟 Key Features

- **🚀 0-Second Native App Intent Engine**: Automatically detects visitor device and operating system (Android Intents `intent://` & iOS Universal Links / Schemes) to launch the official installed app instantly.
- **🛡️ Bypass Webview Login Drop-Offs**: Solves the #1 conversion killer for creators—forces links to open outside Instagram and TikTok in-app browsers where users are already logged in to Google, YouTube, and Amazon.
- **🎨 Custom Social Preview Studio**: Generate rich WhatsApp, X (Twitter), and Telegram preview cards with custom titles, descriptions, and thumbnail images.
- **📱 1200px Dynamic QR Studio**: Download ultra-crisp, high-resolution, unbranded dynamic QR codes for print, packaging, and offline marketing.
- **📊 Real-Time Analytics**: Track total clicks, operating systems (Android vs. iOS vs. Desktop), referrers, and geolocation in real-time.
- **💎 Affiliate Cookie & 1-Click UPI Protection**: Keeps affiliate tags and UPI instant payment intents intact for seamless e-commerce checkouts.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand, Lucide React
- **Backend & Database**: 5-Layer Enterprise Architecture (Router Glue $\to$ Skinny Controller $\to$ Service Business Logic $\to$ Repository Data Access $\to$ Mongoose Model)
- **Security**: HttpOnly, Secure, SameSite=Strict cookies with zero sensitive tokens in client storage

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/VikramKumar-1/snaplink.git
cd snaplink
npm install # or pnpm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 License

MIT License &copy; 2026 SnapLink. Built for modern creators and digital marketers.
