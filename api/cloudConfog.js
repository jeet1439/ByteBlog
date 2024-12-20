import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary, 
  params: {
    folder: 'Byte-blog',
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

// Export as ES6 modules
export { cloudinary, storage };
