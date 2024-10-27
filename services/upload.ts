import axios from "axios";

const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

export async function uploadFiles(files: any) {
  try {
    // Validate if files exist
    if (!files || files.length === 0) {
      return [];
    }

    // Array to store the URLs of uploaded files
    const uploadedUrls: string[] = [];

    // Loop over each file and upload it to Cloudinary
    for (const data of files) {
      console.log(">data>", data);
      const formData = new FormData();
      formData.append("file", data.file); // Append each file
      formData.append("upload_preset", UPLOAD_PRESET as string); // Use your unsigned preset

      // Upload each file to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${Buffer.from(
              `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`
            ).toString("base64")}`,
          },
        }
      );

      // Push the uploaded file's secure URL to the array
      uploadedUrls.push(response.data.secure_url);
    }

    // Return the array of uploaded file URLs
    return uploadedUrls;
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error?.response);
    return [];
  }
}
