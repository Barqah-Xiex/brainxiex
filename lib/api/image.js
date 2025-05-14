const mediaToBuffer = require("./media2buffer");
const axios = require("axios");
const toURL = require("./toURL");

/**
 * AI Image Manipulation Module
 * @param {Object} config - Configuration object
 * @param {string} config.apikey - API key for authentication
 * @param {string} config.BASE - Base URL for API requests
 * @returns {Object} - Set of functions for AI image processing
 */
module.exports = function(config) {
    const { apikey, BASE } = config;

    /**
     * Enhances an image using Remini API.
     * @param {Buffer} buffer - Image buffer to be enhanced
     * @returns {Promise<Buffer>} - Enhanced image buffer
     */
    async function remini(buffer) {
        const data = await mediaToBuffer(buffer);
        const imageBase64 = data.toString("base64");
        const response = await mediaToBuffer(`${BASE}/api/ai/remini`, { apikey, imageBase64 });
        return response;
    }

    /**
     * Converts an image to black and white.
     * @param {Buffer} buffer - Image buffer
     * @param {string} ext - Image extension (e.g., jpg, png)
     * @returns {Promise<Buffer>} - Black and white image buffer
     */
    async function hitamkan(buffer, ext) {
        const link = await toURL(buffer, ext);
        const response = await mediaToBuffer(`${BASE}/api/ai/hitamkan`, { apikey, link });
        return response;
    }

    /**
     * Converts an image into anime style.
     * @param {Buffer} buffer - Image buffer
     * @param {string} ext - Image extension (e.g., jpg, png)
     * @returns {Promise<Buffer>} - Anime-style image buffer
     */
    async function toAnime(buffer, ext) {
        const link = await toURL(buffer, ext);
        const response = await mediaToBuffer(`${BASE}/api/ai/jadianime`, { apikey, link });
        return response;
    }

    /**
     * Generates an image based on a text prompt.
     * @param {string} prompt - Text prompt for image generation
     * @returns {Promise<Buffer>} - Generated image buffer
     */
    const imagine = (prompt) => mediaToBuffer(`${BASE}/api/ai/imagine`, { apikey, prompt });

    /**
     * Generates handwritten text on an image.
     * @param {string} text - Text to be written
     * @returns {Promise<Buffer>} - Image with handwritten text
     */
    const nulis = (text) => mediaToBuffer(`${BASE}/api/image/nulis`, { apikey, text });

    /**
     * Converts an image to a sticker.
     * @param {Buffer} buffer - Image buffer
     * @param {string} [pack="brainxiex"] - Sticker pack name
     * @returns {Promise<Buffer>} - Sticker image buffer
     */
    async function sticker(buffer, pack = "brainxiex") {
        const data = await mediaToBuffer(buffer);
        const base64 = data.toString("base64");
        const response = await mediaToBuffer(`${BASE}/api/image/sticker`, { apikey, base64, pack });
        return response;
    }

    /**
     * Creates a welcome card for new members.
     * @param {string} nama - Name of the new member
     * @param {string} nomor - Number of the new member
     * @param {string} ppimg - Profile picture URL
     * @param {string} grup - Group name
     * @param {number} membernya - Number of group members
     * @param {string} [title="Selamat Datang"] - Title of the card
     * @returns {Promise<Buffer>} - Welcome card image buffer
     */
    const welcomeCard = (nama, nomor, ppimg, grup, membernya, title = "Selamat Datang") => mediaToBuffer(`${BASE}/api/image/welcome`, { apikey, title, nama, nomor, ppimg, grup, membernya });

    /**
     * Creates a goodbye card for departing members.
     * @param {string} nama - Name of the departing member
     * @param {string} nomor - Number of the departing member
     * @param {string} ppimg - Profile picture URL
     * @param {string} grup - Group name
     * @param {number} membernya - Number of group members
     * @param {string} [title="Selamat Tinggal"] - Title of the card
     * @returns {Promise<Buffer>} - Goodbye card image buffer
     */
    const goodbyeCard = (nama, nomor, ppimg, grup, membernya, title = "Selamat Tinggal") => mediaToBuffer(`${BASE}/api/image/welcome`, { apikey, title, nama, nomor, ppimg, grup, membernya });

    /**
     * Creates a banner image.
     * @param {string} nama - Name to display on the banner
     * @param {string} ppimg - Profile picture URL
     * @returns {Promise<Buffer>} - Banner image buffer
     */
    const banner = (nama, ppimg) => mediaToBuffer(`${BASE}/api/image/banner`, { apikey, nama, ppimg });

    /**
     * Captures a screenshot of a webpage.
     * @param {string} url - URL of the webpage to capture
     * @returns {Promise<Buffer>} - Screenshot image buffer
     */
    const screenshot = (url) => mediaToBuffer(`${BASE}/api/image/screenshot`, { apikey, url });

    /**
     * Creates a fake chat image.
     * @param {string} name - Name of the chat participant
     * @param {string} ppimg - Profile picture URL
     * @param {Object} arg - Additional chat content data
     * @returns {Promise<Buffer>} - Fake chat image buffer
     */
    const fakechat = (name, ppimg, arg) => mediaToBuffer(`${BASE}/api/image/fakechat`, { apikey, name, ppimg, arg });

    // Aliases
    const ss = screenshot;
    const qc = fakechat;

    return {
        remini,
        hitamkan,
        toAnime,
        imagine,
        nulis,
        sticker,
        welcomeCard,
        goodbyeCard,
        banner,
        screenshot,
        fakechat,
        ss,
        qc
    }
}
