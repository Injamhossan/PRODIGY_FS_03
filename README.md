# Prodigy Full-Stack E-commerce Platform (FS_03)

A modern, full-stack E-commerce application built with Next.js, Prisma, and PostgreSQL. This project features a robust authentication system, product management for admins, and a seamless shopping experience for users.

## 🚀 Features

- **Authentication**: Secure user login and signup using NextAuth.js with Prisma adapter.
- **Roles**: Support for both `USER` and `ADMIN` roles.
- **Admin Dashboard**: Comprehensive control panel to manage products, categories, and view orders.
- **Interactive Homepage**:
  - Dynamic Hero section
  - Featured and Trending products showcase
  - Category-based navigation
  - Newsletter subscription
- **Shopping Experience**:
  - Interactive Product Catalog
  - Dynamic Shopping Cart
  - Secure Checkout Process
- **Newsletter**: Newsletter subscription system to keep users updated.
- **Modern UI**: Built with Tailwind CSS 4, Lucide React icons, and smooth animations using Framer Motion.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- PostgreSQL (Local or Cloud instance like Vercel Postgres/Supabase)
- PNPM (Recommended package manager)

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd prodigy_fs_03
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the Project
Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router routes
│   ├── admin/      # Administrative routes
│   ├── api/        # Backend API endpoints
│   ├── cart/       # Shopping cart page
│   ├── checkout/   # Checkout process
│   └── ...         # Other user-facing pages
├── components/     # Reusable UI components
├── lib/            # Utility libraries (Prisma client, etc.)
└── assets/         # Static assets and images
prisma/             # Database schema and migrations
public/             # Static public files
```

## 📜 Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm start`: Starts the production server.
- `pnpm lint`: Runs ESLint for code quality checks.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
