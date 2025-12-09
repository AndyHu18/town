import { Router } from "express";
import multer from "multer";
import { storagePut } from "./storage";
import { randomBytes } from "crypto";
import path from "path";

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    // Only allow images
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate unique filename
    const ext = path.extname(req.file.originalname);
    const filename = `${randomBytes(16).toString("hex")}${ext}`;
    const key = `articles/${filename}`;

    // Upload to S3
    const result = await storagePut(key, req.file.buffer, req.file.mimetype);

    res.json({
      url: result.url,
      key: result.key,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

export default router;
