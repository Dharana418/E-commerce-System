import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

/**
 * Upload image to Cloudinary from buffer
 * @param {Buffer} fileBuffer - Image file buffer from multer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise} - Cloudinary upload result
 */
export const uploadToCloudinary = (fileBuffer, folder = 'products') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        quality: 'auto',
        fetch_format: 'auto'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            public_id: result.public_id,
            url: result.secure_url
          });
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public_id
 * @returns {Promise} - Cloudinary deletion result
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Upload multiple images to Cloudinary
 * @param {Array} files - Array of file buffers from multer
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise<Array>} - Array of upload results
 */
export const uploadMultipleToCloudinary = async (files, folder = 'products') => {
  const uploadPromises = files.map(file => uploadToCloudinary(file.buffer, folder));
  return Promise.all(uploadPromises);
};
