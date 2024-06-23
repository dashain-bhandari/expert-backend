import cloudinary from "../../config/cloudinaryConfig";

export const uploadMultipleFiles = async (files: any[]) => {
  const uploadedUrls = [];
  console.log(`files: ${files}`);
  for (const file of files) {
    if (file.size > 600000) {
      throw new Error("File size exceeds the limit of 600KB");
    }
    const currentDateTime = new Date().toISOString().replace(/[-:.]/g, "");
    const originalnameWithoutExtension = file.originalname
      .split(".")
      .slice(0, -1)
      .join(".");
    const publicId = `expert-business-uploads/${currentDateTime}_${originalnameWithoutExtension}`;
    console.log(publicId);
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

    uploadedUrls.push(result.secure_url);
    console.log(uploadedUrls)
  }

  return uploadedUrls;
};
