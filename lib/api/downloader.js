const axios = require("axios");

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
module.exports = function(config){
    const {apikey,BASE} = config;
    const baseURL = BASE+`/api/downloader/`;

    return {
        facebook: (url) => axios.post(baseURL+"facebook",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => ({error: err.message})),
        instagram: (url) => axios.post(baseURL+"instagram",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => ({error: err.message})),
        tiktok: (url) => axios.post(baseURL+"tiktok",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => ({error: err.message})),
        twitter: (url) => axios.post(baseURL+"twitter",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        youtube: (url) => axios.post(baseURL+"youtube",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        fb: (url) => axios.post(baseURL+"facebook",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        ig: (url) => axios.post(baseURL+"instagram",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        tt: (url) => axios.post(baseURL+"tiktok",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        tw: (url) => axios.post(baseURL+"twitter",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        yt: (url) => axios.post(baseURL+"youtube",{url,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
        play: (search) => axios.post(baseURL+"play",{search,apikey}).then(res => res?.data?.Barqah||res?.data).catch(err => {error: err.message}),
    }
}