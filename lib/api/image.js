const mediaToBuffer = require('./media2buffer');
const toURL = require('./toURL');

/**
 * AI Image Manipulation Module
 * @param {Object} config - Configuration object
 * @param {string} config.apikey - API key for authentication
 * @param {string} config.BASE - Base URL for API requests
 * @returns {Object} - Set of functions for AI image processing
 */
module.exports = function (config) {
  const { apikey, BASE } = config;

  /**
   * Enhance image using remote remini endpoint.
   * @param {Buffer|string} input Buffer, file path or URL
   * @returns {Promise<Buffer|Object>} Buffer on success or error object
   */
  async function remini(input) {
    try {
      const data = await mediaToBuffer(input);
      const imageBase64 = data.toString('base64');
      return await mediaToBuffer(`${BASE}/api/ai/remini`, { apikey, imageBase64 });
    } catch (err) {
      return { error: err.message };
    }
  }

  async function hitamkan(input, ext) {
    try {
      const link = await toURL(input, ext);
      return await mediaToBuffer(`${BASE}/api/ai/hitamkan`, { apikey, link });
    } catch (err) {
      return { error: err.message };
    }
  }

  async function toAnime(input, ext) {
    try {
      const link = await toURL(input, ext);
      return await mediaToBuffer(`${BASE}/api/ai/jadianime`, { apikey, link });
    } catch (err) {
      return { error: err.message };
    }
  }

  const imagine = (prompt) =>
    mediaToBuffer(`${BASE}/api/ai/imagine`, { apikey, prompt }).catch((err) => ({
      error: err.message,
    }));
  const nulis = (text) =>
    mediaToBuffer(`${BASE}/api/image/nulis`, { apikey, text }).catch((err) => ({
      error: err.message,
    }));

  async function sticker(input, pack = 'brainxiex') {
    try {
      const data = await mediaToBuffer(input);
      const base64 = data.toString('base64');
      return await mediaToBuffer(`${BASE}/api/image/sticker`, { apikey, base64, pack });
    } catch (err) {
      return { error: err.message };
    }
  }

  const welcomeCard = (nama, nomor, ppimg, grup, membernya, title = 'Selamat Datang') =>
    mediaToBuffer(`${BASE}/api/image/welcome`, {
      apikey,
      title,
      nama,
      nomor,
      ppimg,
      grup,
      membernya,
    }).catch((err) => ({ error: err.message }));

  const goodbyeCard = (nama, nomor, ppimg, grup, membernya, title = 'Selamat Tinggal') =>
    mediaToBuffer(`${BASE}/api/image/welcome`, {
      apikey,
      title,
      nama,
      nomor,
      ppimg,
      grup,
      membernya,
    }).catch((err) => ({ error: err.message }));

  const banner = (nama, ppimg) =>
    mediaToBuffer(`${BASE}/api/image/banner`, { apikey, nama, ppimg }).catch((err) => ({
      error: err.message,
    }));
  const screenshot = (url) =>
    mediaToBuffer(`${BASE}/api/image/screenshot`, { apikey, url }).catch((err) => ({
      error: err.message,
    }));
  const fakechat = (name, ppimg, arg) =>
    mediaToBuffer(`${BASE}/api/image/fakechat`, { apikey, name, ppimg, arg }).catch((err) => ({
      error: err.message,
    }));

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
  };
};
