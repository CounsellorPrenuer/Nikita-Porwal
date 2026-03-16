import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "7fwra7kt",
    dataset: "production", // default dataset
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: "2024-02-24", // use current date
});

// Used for writing data
export const sanityWriteClient = createClient({
    projectId: "7fwra7kt",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "skID5ieTH8eky97d7YoqsbzMpZVm144ktePbezZpDXNp8D2Sbr51Fbv157WI5iTbz05iek7RnOJeDL9Lo1Rflf7FHJf9s5RZ7wcYR48InnO4L5f5u0CRLN0qp2uLYQL03vdcdUjlaivxsENIym8e4JnSeOWXHTOOyj9jP1UeyqqwZye0iGUv",
});
