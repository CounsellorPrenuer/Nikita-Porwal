import { bucket } from "./objectStorage";

export async function makePublic(objectPath: string): Promise<boolean> {
  if (!bucket) {
    return false;
  }

  try {
    const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
    const file = bucket.file(objectPath.replace(`/${bucketId}/`, ""));
    await file.makePublic();
    return true;
  } catch (error) {
    console.error("Error making object public:", error);
    return false;
  }
}

export async function makePrivate(objectPath: string): Promise<boolean> {
  if (!bucket) {
    return false;
  }

  try {
    const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
    const file = bucket.file(objectPath.replace(`/${bucketId}/`, ""));
    await file.makePrivate();
    return true;
  } catch (error) {
    console.error("Error making object private:", error);
    return false;
  }
}
