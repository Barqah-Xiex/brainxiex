const axios = require("axios");

/**
 * Fungsi utama untuk menginisialisasi modul dengan konfigurasi tertentu.
 *
 * @param {Object} [config={}] - Objek konfigurasi opsional.
 * @param {string} [config.apikey="BarqahGantengBangetGilaGantengnyaBikinTergilaGilaBangetSumpah"] - Kunci API untuk autentikasi.
 * @param {string} [config.BASE="http://xiex.my.id"] - URL dasar yang digunakan sebagai endpoint API.
 * @param {boolean} [config.session_local=false] - Apakah menggunakan sesi lokal atau tidak.
 *
 * @returns {Object} Objek yang berisi berbagai fungsi untuk interaksi dengan API.
 */
module.exports = function(config) {
    const { apikey, BASE } = config;
    const baseURL = BASE + `/api/random/`;

    return {
        /**
         * Mengajukan pertanyaan 'apakah'.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        apakah: (ask) => axios.post(baseURL + "apakah", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan 'bisakah'.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        bisakah: (ask) => axios.post(baseURL + "bisakah", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan tentang cita-cita.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        citacita: (ask) => axios.post(baseURL + "citacita", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan 'truth'.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        truth: (ask) => axios.post(baseURL + "truth", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan 'dare'.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        dare: (ask) => axios.post(baseURL + "dare", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan 'fakta'.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        fakta: (ask) => axios.post(baseURL + "fakta", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan gombal.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        gombal: (ask) => axios.post(baseURL + "gombal", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan tentang hobi.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        hobi: (ask) => axios.post(baseURL + "hobi", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan kata mutiara.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        katamutiara: (ask) => axios.post(baseURL + "katamutiara", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan tebakan.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        tebakan: (ask) => axios.post(baseURL + "tebakan", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),

        /**
         * Mengajukan pertanyaan watak.
         * @param {string} ask - Pertanyaan yang ingin diajukan.
         * @returns {Promise<Object>} - Respon dari API.
         */
        watak: (ask) => axios.post(baseURL + "watak", { ask, apikey })
            .then(res => res?.data?.Barqah || res?.data)
            .catch(err => ({ error: err.message })),
    };
}
