import { writeFile } from "fs/promises";
import path from "path";

export async function uploadImageToLocal(fileBuffer, fileName) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "gallery");

  await fs.promises.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, fileBuffer);

  return `/uploads/gallery/${fileName}`;
}