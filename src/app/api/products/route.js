import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { generateSlug } from "@/lib/utils";
import redis from "@/lib/redis";

const CACHE_KEY = "all_products";

// GET - Fetch all products
export async function GET() {
  try {
    // 1. Try to get data from Redis
    try {
      const cachedProducts = await redis.get(CACHE_KEY);
      if (cachedProducts) {
        // console.log("Serving from Cache");
        return NextResponse.json(JSON.parse(cachedProducts));
      }
    } catch (redisError) {
      console.error("Redis GET error:", redisError);
      // Continue to fetch from DB if Redis fails
    }

    // 2. If not in cache, fetch from Database
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 3. Save to Redis for future requests (Expires in 1 hour)
    try {
      if (products.length > 0) {
        await redis.set(CACHE_KEY, JSON.stringify(products), "EX", 3600);
      }
    } catch (redisError) {
      console.error("Redis SET error:", redisError);
    }

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

    // Invalidate Cache after creating a new product
    try {
      await redis.del(CACHE_KEY);
    } catch (redisError) {
      console.error("Redis DEL error:", redisError);
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
