const axios = require("axios");

/**
 * Fungsi utama untuk menginisialisasi modul dengan konfigurasi tertentu.
 *
 * @param {Object} [config={}] - Objek konfigurasi opsional.
 * @param {string} [config.apikey="BarqahGantengBangetGilaGantengnyaBikinTergilaGilaBangetSumpah"] - Kunci API untuk autentikasi.
 * @param {string} [config.BASE="http://xiex.my.id"] - URL dasar yang digunakan sebagai endpoint API.
 *
 * @returns {Object} Objek yang dihasilkan berisi fungsi untuk setiap minigame.
 */
module.exports = function(config) {
    const { apikey, BASE } = config;
    const baseURL = BASE + `/api/minigame/`;

    return {
        /**
         * Memulai game Family 100.
         * @returns {Promise<Object>} - Respon dari API.
         */
        family100: () => axios.post(baseURL + "family100", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Gambar.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebakgambar: () => axios.post(baseURL + "tebakgambar", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Cak Lontong.
         * @returns {Promise<Object>} - Respon dari API.
         */
        caklontong: () => axios.post(baseURL + "caklontong", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Siapakah Aku.
         * @returns {Promise<Object>} - Respon dari API.
         */
        siapakahaku: () => axios.post(baseURL + "siapakahaku", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Bendera.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebakbendera: () => axios.post(baseURL + "tebakbendera", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Kalimat.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebakkalimat: () => axios.post(baseURL + "tebakkalimat", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Kata.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebakkata: () => axios.post(baseURL + "tebakkata", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Kimia.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebakkimia: () => axios.post(baseURL + "tebakkimia", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Lirik.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebaklirik: () => axios.post(baseURL + "tebaklirik", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Memulai game Tebak Tebakan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebaktebakan: () => axios.post(baseURL + "tebaktebakan", { apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),
    };
}
