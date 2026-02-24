import { createClient } from "@sanity/client";

const sanityWriteClient = createClient({
    projectId: "t6wag8hb",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "skr0pA6DNce8y9yOzAj24OP5ZKeI1O1dROJXYk4wKAfL1SQRnZApFugc04cnffjgzGxIVkYxjxqTE8RK7dJ2Dnh5QXlv2av54zCifL4Pxteauw5IWme1zZHchnA6TdWAw0p76WcIgNPasM4HG8xWCPqwAmvmHs9qt13LKOTKxI4L3QRwDSWs",
});

async function addCors() {
    const origins = ["https://counsellorprenuer.github.io", "http://localhost:5173", "http://localhost:5000"];
    for (const origin of origins) {
        try {
            await sanityWriteClient.request({
                url: "/cors",
                method: "POST",
                body: {
                    origin: origin,
                    allowCredentials: true
                }
            });
            console.log(`Added CORS for ${origin}`);
        } catch (e: any) {
            if (e.message && e.message.includes("already exists")) {
                console.log(`CORS for ${origin} already exists.`);
            } else {
                console.error(`Failed to add CORS for ${origin}: ${e.message}`);
            }
        }
    }
}

addCors();
