const fs = require('fs').promises;
const axios = require('../utils').axios;

/**
 * Convert an input (Buffer | file path | URL) into a Buffer.
 * @param {Buffer|string} input Buffer, local path, or remote URL
 * @param {Object} [postBody] optional body when POSTing to a URL
 * @returns {Promise<Buffer>} Buffer of the input
 */
async function mediaToBuffer(input, postBody) {
  if (!input) throw new Error('input not found');

  if (Buffer.isBuffer(input)) return input;

  if (typeof input === 'string') {
    // remote URL
    if (/^https?:\/\//i.test(input)) {
      try {
        const res = postBody
          ? await axios.post(input, postBody, { responseType: 'arraybuffer' })
          : await axios.get(input, { responseType: 'arraybuffer' });
        return Buffer.from(res.data);
      } catch (err) {
        throw new Error(`Failed to fetch buffer from URL: ${err.message}`);
      }
    }

    // local file path
    try {
      return await fs.readFile(input);
    } catch (err) {
      throw new Error(`Failed to read file: ${err.message}`);
    }
  }

  throw new Error('unsupported input type');
}

module.exports = mediaToBuffer;
