import { Storage } from "@google-cloud/storage";

/**
 * @description Google Cloud Storage Instance
 */
const storage = new Storage(); // ADC takes credentials from `GOOGLE_APPLICATION_CREDENTIALS` env var

let bucket; // ! Declared bucket, initialized later

/**
 * @description Have to call function to set the value to
 * bucket because of ES6 importing before running Dotenv config.
 */
async function setBucket() {
  bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
}

export { bucket, setBucket };
