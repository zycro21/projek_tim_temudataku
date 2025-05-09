import multer from "multer";
import path from "path";

// Lokasi penyimpanan
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "../../uploads/project-files"));
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueSuffix);
  },
});

const uploadProjectFile = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB max
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/zip",
      "application/x-zip-compressed",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, ZIP, DOCX, and DOC files are allowed"));
    }
  },
});

export default uploadProjectFile;
