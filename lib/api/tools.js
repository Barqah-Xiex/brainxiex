const mediaToBuffer = require("./media2buffer");
const axios = require("axios");
const toURL = require("./toURL");

/**
 * Search API Module
 * @param {Object} config - Configuration object
 * @param {string} config.apikey - API key for authentication
 * @param {string} config.BASE - Base URL for API requests
 * @returns {Object} - Set of search functions for different platforms
 */
module.exports = function(config) {
    const { apikey, BASE } = config;

    return {
        /**
         * Convert text to Base64.
         * @param {string} text - The input text to encode.
         * @returns {Promise<Object>} - A promise that resolves to the Base64-encoded result or an error object.
         */
        textToBase64: (text) => axios.post(`${BASE}/api/tools/base64`, { apikey, text, mode: "encode" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert Base64 to text.
         * @param {string} text - The Base64-encoded text to decode.
         * @returns {Promise<Object>} - A promise that resolves to the decoded result or an error object.
         */
        base64ToText: (text) => axios.post(`${BASE}/api/tools/base64`, { apikey, text, mode: "decode" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert text to "Enchant" encoding.
         * @param {string} text - The input text to encode.
         * @returns {Promise<Object>} - A promise that resolves to the Enchant-encoded result or an error object.
         */
        textToEnchant: (text) => axios.post(`${BASE}/api/tools/enchant`, { apikey, text, mode: "encode" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert "Enchant" encoding to text.
         * @param {string} text - The Enchant-encoded text to decode.
         * @returns {Promise<Object>} - A promise that resolves to the decoded result or an error object.
         */
        enchantToText: (text) => axios.post(`${BASE}/api/tools/enchant`, { apikey, text, mode: "decode" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert text to Sundanese script.
         * @param {string} text - The input text to encode.
         * @returns {Promise<Object>} - A promise that resolves to the Sundanese-encoded result or an error object.
         */
        textToSunda: (text) => axios.post(`${BASE}/api/tools/sunda`, { apikey, text, mode: "encode" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert Sundanese script to text.
         * @param {string} text - The Sundanese-encoded text to decode.
         * @returns {Promise<Object>} - A promise that resolves to the decoded result or an error object.
         */
        sundaToText: (text) => axios.post(`${BASE}/api/tools/sunda`, { apikey, text, mode: "decode" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert file extension to MIME type.
         * @param {string} text - The file extension to convert.
         * @returns {Promise<Object>} - A promise that resolves to the MIME type result or an error object.
         */
        extToMimetype: (text) => axios.post(`${BASE}/api/tools/mimetype`, { apikey, text, mode: "toMime" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Convert MIME type to file extension.
         * @param {string} text - The MIME type to convert.
         * @returns {Promise<Object>} - A promise that resolves to the file extension result or an error object.
         */
        mimetypeToExt: (text) => axios.post(`${BASE}/api/tools/mimetype`, { apikey, text, mode: "toExt" })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Generate speech from text using Google Text-to-Speech (GTTS).
         * @param {string} text - The input text to convert to speech.
         * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the speech data.
         */
        gtts: (text) => mediaToBuffer(`${BASE}/api/tools/gtts`, { text, apikey })
            .catch(err => ({ error: err.message })),

        /**
         * Format a file from one type to another.
         * @param {Buffer} buffer - The input file as a buffer.
         * @param {string} nowext - The current file extension.
         * @param {string} toext - The desired file extension.
         * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the formatted file.
         */
        formater: async (buffer, nowext, toext) => {
            try {
                const fileurl = await toURL(buffer, nowext);
                const response = await mediaToBuffer(`${BASE}/api/tools/format`, { fileurl, toext, apikey });
                return response;
            } catch (err) {
                return { error: err.message };
            }
        }
    };
};
