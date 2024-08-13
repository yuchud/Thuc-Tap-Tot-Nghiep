const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv').config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const uploadImage = async (containerName, image) => {
  return uploadFile(containerName, image, 'images');
};

const uploadAudio = async (containerName, audio) => {
  return uploadFile(containerName, audio, 'audios');
};

const uploadFile = async (containerName, file, containerClientName) => {
  // console.log('Uploading image');
  if (file === null || file === undefined) {
    return null;
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerClientName);
  const fileUID = uuidv4();
  file_url = `${containerName}/${fileUID}_${Date.now()}`;
  const blockBlobClient = containerClient.getBlockBlobClient(file_url);

  const stream = fs.createReadStream(file.path);
  const size = fs.statSync(file.path).size;
  try {
    await blockBlobClient.uploadStream(stream, size);
    fs.unlinkSync(file.path);
    return blockBlobClient.url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  uploadImage,
  uploadAudio,
};
