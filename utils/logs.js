import axios from 'axios';

import chalk from 'chalk';

// Azure Storage Account information
const accountName = 'tablestoragecoursera';
const containerName = 'myblobcontainer';
const blobName = 'api-logs.txt';

const accountKey = process.env.AZURE_ACCOUNT_KEY; // or use a SAS token

// Azure Blob Storage service endpoint
const blobServiceEndpoint = `https://${accountName}.blob.core.windows.net`;

// Function to append logs to the blob
export const appendLog = async (log) => {
  const sasKey = process.env.AZURE_SAS_KEY;
  // URL to the blob
  const blobUrl = `${blobServiceEndpoint}/${containerName}/${blobName}${sasKey}`;
  try {
    // Get the current content of the blob
    const { data } = await axios.get(blobUrl, {
      headers: {
        // 'x-ms-version': '2019-07-07',
        'x-ms-blob-type': 'BlockBlob',
        // Authorization: `SharedKey ${accountName}:${accountKey}`,
      },
    });

    // Append the log to the current content
    const updatedContent = data + log;
    // Upload the updated content back to the blob
    await axios.put(blobUrl, updatedContent, {
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        // Authorization: `SharedKey ${accountName}:${accountKey}`,
      },
    });
  } catch (error) {
    console.log(chalk.red(error));
    console.error('Error appending log to blob:', error.message);
  }
};
