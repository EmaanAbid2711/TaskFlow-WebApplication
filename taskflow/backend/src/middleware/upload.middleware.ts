import { attachmentUpload } from "../config/multer";

export const uploadAttachment =
  attachmentUpload.single("file");