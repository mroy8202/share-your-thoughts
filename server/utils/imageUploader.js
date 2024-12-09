import { v2 as cloudinary } from "cloudinary";

export const uploadImageToCloudinary = async (file, folder, quality) => {
    const options = { 
        folder,
        resource_type: "auto",
    };

    if (quality) {
        options.quality = quality;
    }

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
