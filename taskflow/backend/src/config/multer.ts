import multer from "multer";
import path from "path";
import fs from "fs";

function createUpload(
  folder: string,
  allowedMimePrefix?: string,
  maxSizeMB = 20
) {
  const uploadDir = path.join(
    process.env.RAILWAY_VOLUME_MOUNT_PATH || "uploads",
    folder
  );

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
      recursive: true,
    });
  }

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },

    filename(req, file, cb) {
      const uniqueName =
        `${Date.now()}-${Math.round(
          Math.random() * 100000
        )}${path.extname(file.originalname)}`;

      cb(null, uniqueName);
    },
  });

  return multer({
    storage,

    limits: {
      fileSize: maxSizeMB * 1024 * 1024,
    },

    fileFilter(req, file, cb) {
      if (
        !allowedMimePrefix ||
        file.mimetype.startsWith(allowedMimePrefix)
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            `Only ${allowedMimePrefix} files are allowed`
          )
        );
      }
    },
  });
}


export const profileUpload = createUpload(
  "profile-images",
  "image/",
  5
);

export const attachmentUpload = createUpload(
  "task-attachments",
  undefined,
  20
);

export default profileUpload;