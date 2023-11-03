import cloudinary from 'cloudinary';
import { Express } from 'express';

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

async function uploadProfileImage(file: Express.Multer.File) {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      // Cloudinary upload options, e.g., folder, transformations, etc.
      folder: 'profile_images',
    });

    // Return the secure URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    throw new Error('Error uploading profile image to Cloudinary');
  }
}

// Other profile-related functions can be added here

export default {
  uploadProfileImage,
  // Other profile-related functions
};
