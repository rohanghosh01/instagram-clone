import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateOTP, SendEmail } from "@/lib/sendMail";
import { generateAndStoreOTP } from "@/services/verify";

// Function to generate random username suggestions
const generateRandomUsernameSuggestions = async (baseUsername: string) => {
  let [name] = baseUsername.toLocaleLowerCase().split(" ");
  const suggestions = new Set<string>(); // Use a set to avoid duplicates
  while (suggestions.size < 2) {
    const randomNumber = Math.floor(Math.random() * 9000) + 100;
    const suggestion = `${name}${randomNumber}`;

    const existingUser = await prisma.user.findFirst({
      where: { username: suggestion },
    });

    if (!existingUser) {
      suggestions.add(suggestion);
    }
  }
  return Array.from(suggestions);
};

export async function POST(req: Request) {
  const { email, password, name, username, about } = await req.json();

  // Check for existing user with the same email
  const existingEmail = await prisma.user.findFirst({
    where: { email },
  });

  if (existingEmail) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  // Check for existing username
  const existingUsername = await prisma.user.findFirst({
    where: { username },
  });

  if (existingUsername) {
    const suggestions = await generateRandomUsernameSuggestions(name);
    return NextResponse.json(
      {
        error: "Username already exists",
        suggestions,
      },
      { status: 400, statusText: "username_exist" }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        about,
        status: "inactive", // Set status to inactive until email is verified
        emailVerified: false,
        isOnline: false,
      },
    });

    // Generate OTP
    const otp = await generateAndStoreOTP(user.id);

    // Store OTP in a cookie
    const response = NextResponse.json(
      {
        message:
          "Registration successful. Please check your email for the OTP.",
      },
      { status: 200 }
    );

    // Send OTP email
    await SendEmail({
      email,
      confirmationCode: otp,
      recipientName: name,
      subject: `${otp} is your Instagram code`,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "User registration failed" },
      { status: 500 }
    );
  }
}
