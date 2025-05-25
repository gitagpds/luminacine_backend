import { Storage } from "@google-cloud/storage";

const bucketName = "luminacine-poster";

const storage = new Storage();
const bucket = storage.bucket(bucketName);

export { bucket };
