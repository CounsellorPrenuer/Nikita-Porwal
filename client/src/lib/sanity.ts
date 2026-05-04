import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "7fwra7kt",
  dataset: "production",
  apiVersion: "2024-03-01",
  useCdn: false, // Set to false since we are using a proxy now
});
