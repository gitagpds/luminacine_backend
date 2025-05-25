import multer from "multer";

const storage = multer.memoryStorage(); // simpan file di memory dulu
const upload = multer({ storage });

export default upload;
