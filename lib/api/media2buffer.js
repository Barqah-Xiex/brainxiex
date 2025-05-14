
const fs = require('fs').promises;
const axios = require('axios');

/**
 * Mengkonversi file atau buffer menjadi URL yang dapat diunggah ke server.
 *
 * @param {Buffer|string} input - Buffer, path file, atau URL file.
 * @param {Object} [postBody={}] - gpp gak di isi juga.
 *
 * @returns {Promise<string>} URL file yang diunggah atau pesan kesalahan.
 */
async function mediaToBuffer(input,postBody) {
  if(!input) return "input not found";
  if (Buffer.isBuffer(input)) return input;
  if (typeof input === 'string') {
    if (input.startsWith('http://') || input.startsWith('https://')) {
      try {
        const response = postBody ? await axios.post(input, postBody, { responseType: 'arraybuffer' }) : await axios.get(input, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
      } catch (error) {
        throw new Error(`Failed to fetch buffer from URL: ${error.message}`);
      }
    } else {
      try {
        return await fs.readFile(input);
      } catch (error) {
        throw new Error(`Failed to read file: ${error.message}`);
      }
    }
  }
  return "input not found";
}

module.exports = mediaToBuffer;
