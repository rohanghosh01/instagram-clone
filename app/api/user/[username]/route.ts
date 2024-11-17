import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cookie from "cookie"; // You might need to install this package

// Handle GET request
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  const userId = cookies.session; // Adjust this key based on your actual cookie key
  const { username } = params;

  // You can now handle the request using the dynamic `username`
  // For example, you could look up user data in a database
  const result = await prisma.user.findUnique({
    where: {
      username: username, // or any other unique identifier
    },
    select: {
      id: true,
      username: true,
      name: true,
      about: true,
      dob: true,
      totalFollowers: true,
      totalFollowing: true,
      totalPosts: true,
      status: true,
      isPrivate: true,
      profileImage: true,
      userInterest: true,
      lastReadNotification: true,
      emailVerified: true,
      socialId: true,
      socialType: true,
      isOnline: true,
      createdAt: true,
      lastSeen: true,
      updatedAt: true,
      address: true,
      // Exclude password and email, for example
    },
  });

  if (!result) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      result: {
        ...result,
        myAccount: result.id === userId,
      },
    },
    { status: 200 }
  );
}
