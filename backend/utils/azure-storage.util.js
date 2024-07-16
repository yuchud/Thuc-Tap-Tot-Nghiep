const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const uploadImage = async (containerName, image) => {
  if (image === null || image === undefined) {
    return null;
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient('images');
  const imageUID = uuidv4();
  image_url = `${containerName}/imageUID_${Date.now()}`;
  const blockBlobClient = containerClient.getBlockBlobClient(image_url);

  const stream = fs.createReadStream(image.path);
  const size = fs.statSync(image.path).size;
  try {
    await blockBlobClient.uploadStream(stream, size);
    fs.unlinkSync(image.path);
    return blockBlobClient.url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  uploadImage,
};
