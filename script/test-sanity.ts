import { createClient } from "@sanity/client";

const sanityWriteClient = createClient({
    projectId: "t6wag8hb",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "skr0pA6DNce8y9yOzAj24OP5ZKeI1O1dROJXYk4wKAfL1SQRnZApFugc04cnffjgzGxIVkYxjxqTE8RK7dJ2Dnh5QXlv2av54zCifL4Pxteauw5IWme1zZHchnA6TdWAw0p76WcIgNPasM4HG8xWCPqwAmvmHs9qt13LKOTKxI4L3QRwDSWs",
});

async function test() {
    try {
        await sanityWriteClient.createOrReplace({ _type: 'test', _id: 'test-doc', name: 'test' });
        console.log('success');
    } catch (e: any) {
        if (e.response) {
            console.log(JSON.stringify(e.response.body, null, 2));
        } else {
            console.log(e.message);
        }
    }
}
test();
