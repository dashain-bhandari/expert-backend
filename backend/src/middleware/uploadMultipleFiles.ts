import cloudinary from "../../config/cloudinaryConfig";

export const uploadMultipleFiles = async (files: any[]) => {
  const uploadedUrls = [];
  console.log(`files: ${files}`);
  for (const file of files) {
    if (file.size > 400000) {
      throw new Error("File size exceeds the limit of 400KB");
    }
    const currentDateTime = new Date().toISOString().replace(/[-:.]/g, "");
    const originalnameWithoutExtension = file.originalname
      .split(".")
      .slice(0, -1)
      .join(".");
    const publicId = `expert-business-uploads/${currentDateTime}_${originalnameWithoutExtension}`;
    console.log(publicId);

    const result = await cloudinary.uploader.upload(file.path, {
      public_id: publicId,
    });

    uploadedUrls.push(result.secure_url);
    console.log(uploadedUrls)
  }

  return uploadedUrls;
};
