import { bucket } from "../../config/storage.js";

/**
 * @description Uploads a file to Google Cloud Storage
 */
async function upload(req, res) {
  const blob = bucket.file(req.files.file.name);
  const blobStream = blob.createWriteStream();

  blobStream.on("finish", () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${
      blob.name
    }_${new Date().getTime()}`;

    res.json({
      publicUrl,
    });
  });

  blobStream.on("error", (err) => {
    console.log(err);
    res.json({
      err,
    });
  });

  blobStream.end(req.files.file.buffer);
}

export { upload };
