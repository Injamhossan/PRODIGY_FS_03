import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user orders
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Fetch wishlist items
    const wishlist = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    // Calculate stats
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const wishlistCount = wishlist.length;

    // Format recent orders for dashboard
    const formattedOrders = orders.slice(0, 5).map(order => ({
      id: `#${order.id.slice(-8).toUpperCase()}`,
      date: new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: order.status,
      total: order.total,
      items: order.items.length,
      image: order.items[0]?.product?.image || "",
    }));

    // Format wishlist for dashboard
    const formattedWishlist = wishlist.slice(0, 5).map(item => ({
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      id: item.product.id,
    }));

    return NextResponse.json({
      stats: [
        { label: "Total Orders", value: totalOrders.toString().padStart(2, '0'), icon: "Package", color: "blue" },
        { label: "Wishlist", value: wishlistCount.toString().padStart(2, '0'), icon: "Heart", color: "rose" },
        { label: "Total Spent", value: `$${totalSpent.toLocaleString()}`, icon: "CreditCard", color: "amber" },
      ],
      recentOrders: formattedOrders,
      wishlist: formattedWishlist,
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
