# Artisan - Premium Full-Stack E-commerce Platform

A high-end, full-stack E-commerce experience designed for artisan-crafted furniture and home decor. Built with a cutting-edge architectural stack featuring **Next.js 15**, **Redux Toolkit**, **Prisma**, and **PostgreSQL**.

## ✨ Key Features

- **🛍️ Reactive Shopping Experience**:
  - Global state management using **Redux Toolkit** for real-time Cart and Wishlist updates.
  - Smooth, lag-free interactions powered by **Framer Motion** animations.
- **🔐 Advanced Authentication**:
  - Secure login/signup system via **NextAuth.js**.
  - Support for **Google**, **GitHub**, and traditional Credentials providers.
  - Role-based access control (`ADMIN` vs `USER`).
- **🛡️ Admin Command Center**:
  - Full management of products, categories, and orders.
  - Payment tracking and order status management.
- **🎨 Premium Design System**:
  - Vibrant, glassmorphic UI using **Tailwind CSS**.
  - Modern typography and custom-curated icon set from **Lucide React**.
- **💳 Seamless Checkout & Payments**:
  - Integrated checkout flow with support for simulated payments (SSLCommerz integration).
  - Order persistence and transaction tracking.
- **👤 Personalized Dashboard**:
  - User profile settings (Name, Phone, Location).
  - Dedicated order history and wishlist collection.

## 🛠️ Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Redux](https://react-redux.js.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Supabase)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **PNPM**: v8.0.0 or higher (Recommended)
- **PostgreSQL**: Local instance or Cloud (Supabase/Neon)

## ⚙️ Getting Started

### 1. Installation
```bash
git clone <repository-url>
cd prodigy_fs_03
pnpm install
```

### 2. Environment Configuration
Create a `.env.local` file:
```env
DATABASE_URL="your-postgresql-url"
DIRECT_URL="your-direct-postgresql-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID="your-google-id"
GOOGLE_CLIENT_SECRET="your-google-secret"
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"
```

### 3. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 4. Development Mode
```bash
pnpm dev 
npm run dev
```

## 📁 Architecture Overview

```text
src/
├── app/            # Next.js App Router (Pages & API)
│   ├── admin/      # Management Dashboard
│   ├── api/        # Serverless API routes
│   ├── dashboard/  # User Personal Area
│   └── (store)/    # Product, Cart, and Checkout pages
├── components/     # High-fidelity UI Components
├── redux/          # Global State (Cart & Wishlist Slices)
├── assets/         # Static Media (Logos, Optimized Images)
├── lib/            # Shared Utilities (Prisma, Auth Config)
└── styles/         # Global CSS and Design Tokens
```

## 📜 Available Scripts

- `pnpm dev`: Start development server on port 3000.
- `pnpm build`: Generate optimized production build.
- `pnpm start`: Launch production server.
- `pnpm lint`: Perform static code analysis.

## 🤝 Contributing

We welcome contributions to enhance the Artisan experience. Please open an issue or submit a pull request for any improvements.

## 📄 License

Licensed under the [MIT License](LICENSE).
