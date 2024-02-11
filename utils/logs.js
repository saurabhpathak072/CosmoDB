import express from 'express';
import axios from 'axios';
import fs from 'fs';
import chalk from 'chalk';

const app = express();
const PORT = process.env.PORT || 3000;

// Azure Storage Account information
const accountName = 'tablestoragecoursera';
const containerName = 'myblobcontainer';
const blobName = 'api-logs.txt';
const accountKey = '3+5Vs7R9NnGcyt+mZsMt+HHGOSfqfCyi9p8YEV+PkI6n2zd/3uzWEeS60i6GyjSat5NJY2NsaZW7+AStfQ1k0Q=='; // or use a SAS token

// Azure Blob Storage service endpoint
const blobServiceEndpoint = `https://${accountName}.blob.core.windows.net`;

// URL to the blob
const blobUrl = `${blobServiceEndpoint}/${containerName}/${blobName}`;






// Function to append logs to the blob
export const appendLog=async (log)=> {
  try {
    // Get the current content of the blob
    const { data } = await axios.get(blobUrl, {
      headers: { 'x-ms-version': '2019-07-07', 'x-ms-blob-type': 'BlockBlob', Authorization: `SharedKey ${accountName}:${accountKey}` },
    });

    // Append the log to the current content
    const updatedContent = data + log;

    // Upload the updated content back to the blob
    await axios.put(blobUrl, updatedContent, {
      headers: { 'x-ms-blob-type': 'BlockBlob', Authorization: `SharedKey ${accountName}:${accountKey}` },
    });
  } catch (error) {
    console.log(chalk.red(error));
    console.error('Error appending log to blob:', error.message);
  }
}
