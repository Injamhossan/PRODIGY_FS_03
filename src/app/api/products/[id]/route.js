import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Fetch single product (by ID or slug)
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    // Check if it's a slug (contains hyphens) or an ID
    const isSlug = id.includes('-');
    
    const product = await prisma.product.findUnique({
      where: isSlug ? { slug: id } : { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT - Update product
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, description, price, originalPrice, discount, image, categoryId, stock, tag } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        discount,
        image,
        categoryId,
        stock: parseInt(stock),
        tag,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
