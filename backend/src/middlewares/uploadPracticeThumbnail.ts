import multer from "multer";
import path from "path";
import fs from "fs";

// Pastikan folder ada
const thumbnailDir = path.join(__dirname, "../../uploads/practice-thumbnails");
if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, thumbnailDir);
  },
  filename: function (_req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const uploadPracticeThumbnail = multer({ storage });

export default uploadPracticeThumbnail;
