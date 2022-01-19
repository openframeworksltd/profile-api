// Imports the Google Cloud client library.
import {GetBucketsResponse, Storage} from "@google-cloud/storage";


// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage();

// Makes an authenticated API request.
export const listBuckets = async () => {
    try {
        const results: GetBucketsResponse = await storage.getBuckets();

        const [buckets] = results;

        console.log('Buckets:');
        buckets.forEach(bucket => {
            console.log(bucket.name);
        });
    } catch (err) {
        console.error('ERROR:', err);
    }
};

