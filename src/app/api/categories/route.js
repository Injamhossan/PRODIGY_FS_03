import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

const CACHE_KEY = "all_categories";

// GET - Fetch all categories
export async function GET() {
  try {
    // 1. Try Redis Cache
    try {
      const cachedCategories = await redis.get(CACHE_KEY);
      if (cachedCategories) {
        return NextResponse.json(JSON.parse(cachedCategories));
      }
    } catch (redisError) {
      console.error("Redis GET error:", redisError);
    }

    // 2. Fetch from DB
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    // 3. Save to Cache
    try {
      if (categories.length > 0) {
        await redis.set(CACHE_KEY, JSON.stringify(categories), "EX", 3600);
      }
    } catch (redisError) {
      console.error("Redis SET error:", redisError);
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST - Create a new category
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, image } = body;

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        image,
      },
    });

    // Invalidate Cache
    try {
      await redis.del(CACHE_KEY);
    } catch (redisError) {
      console.error("Redis DEL error:", redisError);
    }

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
