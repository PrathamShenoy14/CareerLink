import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load Cloudinary credentials from .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPDF = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", format: "pdf" },
      (error, result) => {
        if (error) reject(new Error("Cloudinary Upload Failed"));
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

export const deletePDF = async (publicId) => {
  try {
    console.log(`Attempting to delete file: ${publicId}`); // Debugging

    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

    console.log("Cloudinary Deletion Response:", result); // Check if "not found"
    return result;
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
  }
};
