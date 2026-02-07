import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { generateSlug } from "@/lib/utils";

// GET - Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST - Create a new product
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, price, originalPrice, discount, image, categoryId, stock, tag } = body;

    if (!name || !price || !image || !categoryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = generateSlug(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        discount,
        image,
        categoryId,
        stock: stock ? parseInt(stock) : 0,
        tag,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
