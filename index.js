/**
 * Fungsi utama untuk menginisialisasi modul dengan konfigurasi tertentu.
 *
 * @param {Object} [config={}] - Objek konfigurasi opsional.
 * @param {string} [config.apikey="BarqahGantengBangetGilaGantengnyaBikinTergilaGilaBangetSumpah"] - Kunci API untuk autentikasi.
 * @param {string} [config.BASE="http://xiex.my.id"] - URL dasar yang digunakan sebagai endpoint API.
 * @param {boolean} [config.session_local=false] - Apakah menggunakan sesi lokal atau tidak.
 *
 * @returns {Object} Objek yang dihasilkan dari modul `./lib` dengan konfigurasi yang disediakan.
 */
/**
 * Entry point for brainxiex library.
 *
 * @param {Object} [config={}] - Configuration object
 * @param {string} [config.apikey] - API key used for remote requests. If omitted a placeholder is used.
 * @param {string} [config.BASE] - Base URL for the API endpoints.
 * @param {boolean} [config.session_local=false] - When true, enables an in-memory session store on the global object.
 *
 * @returns {Object} Library instance exposing api modules and version.
 */
module.exports = function (config = {}) {
  const defaults = {
    // Use environment variable when possible. Falls back to the original default key when not provided.
    apikey:
      process.env.BRAINXIE_APIKEY ||
      'BarqahGantengBangetGilaGantengnyaBikinTergilaGilaBangetSumpah',
    BASE: process.env.BRAINXIE_BASE || 'http:/brainxiex.com',
    session_local: false,
  };

  const cfg = Object.assign({}, defaults, config);

  if (cfg.session_local && typeof global !== 'undefined') {
    global.brainxiex = global.brainxiex || {};
    global.brainxiex.session = global.brainxiex.session || {};
  }

  const lib = require('./lib')(cfg);
  const fs = require('fs');
  let version = '0.0.0';
  try {
    const pkg = JSON.parse(
      fs.readFileSync(require('path').join(__dirname, 'package.json'), 'utf8')
    );
    version = pkg && pkg.version ? pkg.version : version;
  } catch (e) {
    // ignore and fallback to default version
  }

  return Object.assign({ version }, lib);
};
