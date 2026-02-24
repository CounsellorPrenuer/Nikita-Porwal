import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "t6wag8hb",
    dataset: "production", // default dataset
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: "2024-02-24", // use current date
});

// Used for writing data
export const sanityWriteClient = createClient({
    projectId: "t6wag8hb",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "skr0pA6DNce8y9yOzAj24OP5ZKeI1O1dROJXYk4wKAfL1SQRnZApFugc04cnffjgzGxIVkYxjxqTE8RK7dJ2Dnh5QXlv2av54zCifL4Pxteauw5IWme1zZHchnA6TdWAw0p76WcIgNPasM4HG8xWCPqwAmvmHs9qt13LKOTKxI4L3QRwDSWs",
});
