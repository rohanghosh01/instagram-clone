import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cookie from "cookie"; // You might need to install this package

export async function POST(req: NextRequest) {
  const { description, tags, media, settings, location } = await req.json();

  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const userId = cookies.session; // Adjust this key based on how you store the user ID in cookies

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!Array.isArray(media)) {
    return NextResponse.json(
      { error: "Media must be an array" },
      { status: 400 }
    );
  }

  try {
    const formattedMedia = media.map((item: any) => ({
      url: item.url,
      type: item.type,
      size: item.size,
    }));
    const newPost = await prisma.post.create({
      data: {
        description,
        userId,
        tags,
        media: formattedMedia as any[], // Cast to any[]
        settings,
        location,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Parse cookies to get userId
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const userId = cookies.session; // Adjust this key based on your actual cookie key

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract query parameters
    const {
      search = "",
      limit = 10,
      offset = 0,
      sort = "desc",
    } = Object.fromEntries(new URL(req.url).searchParams);

    // Fetch posts with limit, offset, search, sort, and user info
    const results = await prisma.post.findMany({
      where: {
        OR: [
          { description: { contains: search, mode: "insensitive" } }, // Search by description
          { tags: { hasSome: [search] } }, // Search by tags (if tag matches)
        ],
        // userId: userId
      },
      take: Number(limit), // Limit the number of posts
      skip: Number(offset), // Offset for pagination
      orderBy: {
        createdAt: sort === "asc" ? "asc" : "desc", // Sort by createdAt field
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profileImage: true,
            name: true,
            totalFollowers: true,
            totalFollowing: true,
            totalPosts: true,
            about: true,
            isPrivate: true,
          },
        },
      },
    });

    const nextId = results.length ? Number(offset) + Number(limit) : null;
    const previousId =
      Number(offset) === 0 ? 0 : Number(offset) - Number(limit);

    return NextResponse.json({ results, nextId, previousId }, { status: 200 });
  } catch (error) {
    console.error("Error GET posts:", error);
    return NextResponse.json({ error: "Failed to GET posts" }, { status: 500 });
  }
}
