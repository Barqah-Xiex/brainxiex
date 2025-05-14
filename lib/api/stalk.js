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
         * Stalk a TikTok user profile.
         * @param {string} username - The TikTok username to stalk.
         * @returns {Promise<Object>} - A promise that resolves to the TikTok user profile data.
         */
        tiktokstalk: (username) => axios.post(`${BASE}/api/tools/tiktokstalk`, { apikey, username }),

        /**
         * Stalk an Instagram user profile.
         * @param {string} username - The Instagram username to stalk.
         * @returns {Promise<Object>} - A promise that resolves to the Instagram user profile data.
         */
        instagramstalk: (username) => axios.post(`${BASE}/api/tools/igstalk`, { apikey, username }),
    };
};
