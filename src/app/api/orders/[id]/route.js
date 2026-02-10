import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH - Update order status or payment status
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, paymentStatus } = body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
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

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// GET - Fetch single order
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// DELETE - Remove an order
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    
    // First delete order items due to relations
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    });

    await prisma.order.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
