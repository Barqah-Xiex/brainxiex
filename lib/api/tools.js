const mediaToBuffer = require('./media2buffer');
const axios = require('../utils').axios;
const toURL = require('./toURL');

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error - Error message
 */

/**
 * @typedef {Object} Config
 * @property {string} apikey - API key untuk autentikasi
 * @property {string} BASE - Base URL API
 */

/**
 * Search API Module
 * @param {Config} config
 * @returns {{
 *  textToBase64(text: string): Promise<any | ErrorResponse>,
 *  base64ToText(text: string): Promise<any | ErrorResponse>,
 *  textToEnchant(text: string): Promise<any | ErrorResponse>,
 *  enchantToText(text: string): Promise<any | ErrorResponse>,
 *  textToSunda(text: string): Promise<any | ErrorResponse>,
 *  sundaToText(text: string): Promise<any | ErrorResponse>,
 *  extToMimetype(text: string): Promise<any | ErrorResponse>,
 *  mimetypeToExt(text: string): Promise<any | ErrorResponse>,
 *  gtts(text: string): Promise<Buffer | ErrorResponse>,
 *  formater(buffer: Buffer, nowext: string, toext: string): Promise<Buffer | ErrorResponse>,
 *  googleAI(prompt?: string): Promise<string | ErrorResponse>
 * }}
 */
module.exports = function (config) {
  const { apikey, BASE } = config;

  return {
    /**
     * Encode text ke Base64
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    textToBase64: (text) =>
      axios
        .post(`${BASE}/api/tools/base64`, { apikey, text, mode: 'encode' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Decode Base64 ke text
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    base64ToText: (text) =>
      axios
        .post(`${BASE}/api/tools/base64`, { apikey, text, mode: 'decode' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Encode text ke Enchant
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    textToEnchant: (text) =>
      axios
        .post(`${BASE}/api/tools/enchant`, { apikey, text, mode: 'encode' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Decode Enchant ke text
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    enchantToText: (text) =>
      axios
        .post(`${BASE}/api/tools/enchant`, { apikey, text, mode: 'decode' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Encode text ke aksara Sunda
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    textToSunda: (text) =>
      axios
        .post(`${BASE}/api/tools/sunda`, { apikey, text, mode: 'encode' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Decode aksara Sunda ke text
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    sundaToText: (text) =>
      axios
        .post(`${BASE}/api/tools/sunda`, { apikey, text, mode: 'decode' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Convert extension → MIME type
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    extToMimetype: (text) =>
      axios
        .post(`${BASE}/api/tools/mimetype`, { apikey, text, mode: 'toMime' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Convert MIME type → extension
     * @param {string} text
     * @returns {Promise<any | ErrorResponse>}
     */
    mimetypeToExt: (text) =>
      axios
        .post(`${BASE}/api/tools/mimetype`, { apikey, text, mode: 'toExt' })
        .then((res) => res?.data?.Barqah || res?.data)
        .catch((err) => ({ error: err.message })),

    /**
     * Text-to-Speech (GTTS)
     * @param {string} text
     * @returns {Promise<Buffer | ErrorResponse>}
     */
    gtts: (text) =>
      mediaToBuffer(`${BASE}/api/tools/gtts`, { text, apikey }).catch((err) => ({
        error: err.message,
      })),

    /**
     * Convert file format
     * @param {Buffer} buffer
     * @param {string} nowext
     * @param {string} toext
     * @returns {Promise<Buffer | ErrorResponse>}
     */
    formater: async (buffer, nowext, toext) => {
      try {
        const fileurl = await toURL(buffer, nowext);
        const response = await mediaToBuffer(`${BASE}/api/tools/format`, {
          fileurl,
          toext,
          apikey,
        });
        return response;
      } catch (err) {
        return { error: err.message };
      }
    },

    /**
     * Google AI text generation
     * @param {string} [prompt]
     * @returns {Promise<string | ErrorResponse>}
     */
    googleAI: (prompt = '') =>
      axios
        .post(`${BASE}/api/ai/googleAI`, { apikey, prompt })
        .then((res) => res?.data?.result || res?.data)
        .catch((err) => ({ error: err.message })),
  };
};