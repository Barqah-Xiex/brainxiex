const axios = require('../utils').axios;
const fs = require('fs');
const path = require('path');

/**
 * Convert various input types (Buffer | path | URL) into an uploaded remote URL.
 * @param {Buffer|string} input Buffer, local path or remote URL
 * @param {string} [extension] required when input is Buffer without extension
 * @returns {Promise<string>} uploaded URL
 */
async function toURL(input, extension) {
  // Buffer input
  if (Buffer.isBuffer(input)) {
    if (!extension) throw new Error('extension not found, provide e.g. "jpg", "png", "mp4"');
    return uploadBuffer(input, extension);
  }

  // local file path
  if (typeof input === 'string' && fs.existsSync(input)) {
    const data = fs.readFileSync(input).toString('base64');
    return uploadFile(data, path.basename(input));
  }

  // remote URL
  if (typeof input === 'string' && /^https?:\/\//i.test(input)) {
    try {
      const response = await axios.get(input, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const fileExtension = path.extname(new URL(input).pathname).slice(1) || extension;
      return uploadBuffer(buffer, fileExtension);
    } catch (err) {
      throw new Error('Failed to download URL: ' + err.message);
    }
  }

  throw new Error('file not found or unsupported input');
}

function uploadBuffer(buffer, extension) {
  const data = buffer.toString('base64');
  return uploadFile(data, `brainxiex-uploader.${extension}`);
}

async function uploadFile(data, name) {
  try {
    const v = await axios.post('http://upload.xiex.my.id/', { file: { data, name } });
    return v.data;
  } catch (err) {
    throw new Error('uploader server down: ' + (err.message || String(err)));
  }
}

module.exports = toURL;
