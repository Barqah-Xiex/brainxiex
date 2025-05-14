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
         * Searches Pinterest for the given query.
         * @param {string} search - Search query
         * @returns {Promise<Object>} - Search results from Pinterest
         */
        pinterest: (search) => axios.post(`${BASE}/api/search/pinterest`, { apikey, search })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Searches Google for the given query.
         * @param {string} search - Search query
         * @returns {Promise<Object>} - Search results from Google
         */
        google: (search) => axios.post(`${BASE}/api/search/google`, { apikey, search })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Searches YouTube for the given query.
         * @param {string} search - Search query
         * @returns {Promise<Object>} - Search results from YouTube
         */
        youtubeSearch: (search) => axios.post(`${BASE}/api/search/youtube`, { apikey, search })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Searches YTS for the given query.
         * @param {string} search - Search query
         * @returns {Promise<Object>} - Search results from YTS
         */
        yts: (search) => axios.post(`${BASE}/api/search/yts`, { apikey, search })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),
    };
}
