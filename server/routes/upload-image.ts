import { Router } from "express";
import multer from "multer";
import { storagePut } from "../storage";

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `blog/${timestamp}-${req.file.originalname}`;

    // Upload to S3
    const { url } = await storagePut(
      filename,
      req.file.buffer,
      req.file.mimetype
    );

    res.json({ url });
  } catch (error) {
    console.error("[upload-image] Error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

export default router;

