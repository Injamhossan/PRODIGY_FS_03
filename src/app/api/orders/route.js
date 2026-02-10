import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Fetch all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST - Create a new order
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, items, total, shippingAddress, contactInfo } = body;

    if (!userId || !items || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        total: parseFloat(total),
        status: "Processing",
        paymentStatus: body.paymentMethod ? "Paid" : "Unpaid",
        paymentMethod: body.paymentMethod || "COD",
        transactionId: body.transactionId || `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        shippingAddress: typeof shippingAddress === 'string' ? shippingAddress : JSON.stringify(shippingAddress),
        contactInfo: typeof contactInfo === 'string' ? contactInfo : JSON.stringify(contactInfo),
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
