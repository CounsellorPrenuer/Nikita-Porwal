import { createClient } from "@sanity/client";

export const sanityClient = createClient({
    projectId: "7fwra7kt",
    dataset: "production", // default dataset
    useCdn: false, // Disabling CDN to bypass possible CORS cache issue
    apiVersion: "2024-02-24", // use current date
    token: "ska0Vwzw3WI3JM3AbZIEkDGwTHjw8kFXHWaMEtWQEngT8261ET3AZoYblKMd88VqBqLgpcXl8AtYOAaM2c8CzjmLKZLdLjjOhovJpy5jMwwStmOYOVNKcJ0IXDcytrkt64PZEiEZcmDlNvaBPAW4AJxGMPdVeEGXIKvElMjznhZ2GKL4UG6m",
});

// Used for writing data
export const sanityWriteClient = createClient({
    projectId: "7fwra7kt",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "sksftTYRzY8Qpdp1zmohuc95DFyAB3VPiQztgGMv7sRGK8D92XJ2nb13pTNxml5rtrvpIb6FTxkMJUlGcWYbAC4eONJ7QjAtLsn1LxcqrAeMdj9y3McO5Jpf21nThhoY0VqbiTNzzWn4vuF5PCcF3Dwo1qrFOtyRMjZu0HK7CCPrU8z6RpYm",
});
