import cloudinary from "../../config/cloudinaryConfig";

// Middleware function for uploading single file to Cloudinary
export const uploadSingleFile = async (file: any) => 
{
  if (file.size > 600000) {
    throw new Error("File size exceeds the limit of 600KB");
  }
  console.log(file)
  const currentDateTime = new Date().toISOString().replace(/[-:.]/g, ""); // Get current date and time
  const originalnameWithoutExtension = file.originalname.split(".").slice(0, -1).join("."); // Remove file extension
  const publicId = `expert-business-uploads/${currentDateTime}_${originalnameWithoutExtension}`; // Create unique public_id
  console.log(publicId)
  let uploadOptions: any = {
    public_id: publicId,
  };

  if (file.mimetype.includes('image')) {
    // For images, Cloudinary detects resource_type automatically ('auto')
  } else {
    // For non-image files (PDF, DOCX), specify resource_type: 'raw'
    uploadOptions.resource_type = 'raw';
  }
  const result = await cloudinary.uploader.upload(file.path, uploadOptions);
  console.log(result)
  return result.secure_url;
};