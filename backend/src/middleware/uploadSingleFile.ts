import cloudinary from "../../config/cloudinaryConfig";

// Middleware function for uploading single file to Cloudinary
export const uploadSingleFile = async (file: any) => 
{
  if (file.size > 400000) {
    throw new Error("File size exceeds the limit of 400KB");
  }
  console.log(file)
  const currentDateTime = new Date().toISOString().replace(/[-:.]/g, ""); // Get current date and time
  const originalnameWithoutExtension = file.originalname.split(".").slice(0, -1).join("."); // Remove file extension
  const publicId = `expert-business-uploads/${currentDateTime}_${originalnameWithoutExtension}`; // Create unique public_id
  console.log(publicId)
  const result = await cloudinary.uploader.upload(file.path, { public_id: publicId });
  console.log(result)
  return result.secure_url;
};