import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory for direct Cloudinary upload
const upload = multer({ storage: storage });

export default upload;