import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;

if (!bucketId) {
  console.warn("Object storage bucket not configured");
}

export const bucket = bucketId ? storage.bucket(bucketId) : null;

export async function getSignedUploadUrl(fileName: string, contentType: string): Promise<{ url: string; objectPath: string } | null> {
  if (!bucket) {
    return null;
  }

  const privateDir = process.env.PRIVATE_OBJECT_DIR || `/${bucketId}/.private`;
  const objectPath = `${privateDir}/${Date.now()}-${fileName}`;
  const file = bucket.file(objectPath.replace(`/${bucketId}/`, ""));

  const [signedUrl] = await file.getSignedUrl({
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000,
    contentType,
  });

  return { url: signedUrl, objectPath };
}

export async function getSignedReadUrl(objectPath: string): Promise<string | null> {
  if (!bucket) {
    return null;
  }

  const file = bucket.file(objectPath.replace(`/${bucketId}/`, ""));
  
  const [signedUrl] = await file.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + 60 * 60 * 1000,
  });

  return signedUrl;
}

export async function deleteObject(objectPath: string): Promise<boolean> {
  if (!bucket) {
    return false;
  }

  try {
    const file = bucket.file(objectPath.replace(`/${bucketId}/`, ""));
    await file.delete();
    return true;
  } catch (error) {
    console.error("Error deleting object:", error);
    return false;
  }
}

export function getPublicUrl(objectPath: string): string {
  return `https://storage.googleapis.com${objectPath}`;
}
