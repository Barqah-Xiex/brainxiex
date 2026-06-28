const axios = require('../utils').axios;

/**
 * Fungsi utama untuk menginisialisasi modul dengan konfigurasi tertentu.
 *
 * @param {Object} [config={}] - Objek konfigurasi opsional.
 * @param {string} [config.apikey="BarqahGantengBangetGilaGantengnyaBikinTergilaGilaBangetSumpah"] - Kunci API untuk autentikasi.
 * @param {string} [config.BASE="http://xiex.my.id"] - URL dasar yang digunakan sebagai endpoint API.
 * @param {boolean} [config.session_local=false] - Apakah menggunakan sesi lokal atau tidak.
 *
 * @returns {Object} Objek yang dihasilkan
 */
/**
 * Downloader helpers for common platforms.
 * @param {Object} config
 * @param {string} config.apikey
 * @param {string} config.BASE
 */
module.exports = function (config) {
  const { apikey, BASE } = config;
  const baseURL = `${BASE}/api/downloader/`;

  const wrap = (path, bodyKey) => async (value) => {
    try {
      const res = await axios.post(`${baseURL}${path}`, { [bodyKey || 'url']: value, apikey });
      return res?.data?.Barqah || res?.data;
    } catch (err) {
      return { error: err.message };
    }
  };

  return {
    reels: wrap('reels', 'url'),
    facebook: wrap('facebook', 'url'),
    instagram: wrap('instagram', 'url'),
    tiktok: wrap('tiktok', 'url'),
    twitter: wrap('twitter', 'url'),
    youtube: wrap('youtube', 'url'),
    fb: wrap('facebook', 'url'),
    ig: wrap('instagram', 'url'),
    tt: wrap('tiktok', 'url'),
    tw: wrap('twitter', 'url'),
    yt: wrap('youtube', 'url'),
    play: wrap('play', 'search'),
  };
};
