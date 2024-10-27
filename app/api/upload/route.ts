import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
const CLOUDINARY_API_SECRET = process.env
  .NEXT_PUBLIC_CLOUDINARY_API_SECRET as string;
const CLOUDINARY_CLOUD_NAME = process.env
  .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    // Get the form data (e.g., the uploaded files)
    const formData = await req.formData();
    const files = formData.getAll("file"); // This will return an array of files

    if (files.length === 0) {
      return new NextResponse(JSON.stringify({ error: "No files provided" }), {
        status: 400,
      });
    }

    const uploadPromises = files.map(async (file) => {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("upload_preset", UPLOAD_PRESET);
      cloudinaryFormData.append("api_key", CLOUDINARY_API_KEY);
      // cloudinaryFormData.append("timestamp", Math.floor(Date.now() / 1000));

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        cloudinaryFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          auth: {
            username: CLOUDINARY_API_KEY!,
            password: CLOUDINARY_API_SECRET!,
          },
        }
      );

      const { secure_url, resource_type, bytes } = response.data;
      return { url: secure_url, type: resource_type, size: bytes };
    });

    const uploadResults = await Promise.all(uploadPromises);

    return new NextResponse(JSON.stringify({ results: uploadResults }), {
      status: 200,
    });
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error?.response);
    return new NextResponse(JSON.stringify({ error: "Failed to upload" }), {
      status: 500,
    });
  }
}
