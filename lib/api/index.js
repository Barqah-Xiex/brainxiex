const fs = require('fs');

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
module.exports = function(config){
    const fitur = {};

    fitur.ai = require("./ai")(config);
    fitur.downloader = require("./downloader")(config);
    fitur.image = require("./image")(config);
    fitur.media2buffer = require("./media2buffer");
    fitur.minigame = require("./minigame")(config);
    fitur.random = require("./random")(config);
    fitur.search = require("./search")(config);
    fitur.toURL = require("./toURL");

    for (const element of Object.keys(fitur)) {
        if(typeof fitur[element] == "object") for (const element2 of Object.keys(fitur[element])) if(typeof fitur[element][element2]) fitur[element2] = fitur[element][element2];
    }

    // const modules = fs.readdirSync(__dirname).filter(file => file != 'index.js').map(file => file.split('.js')[0]);

    // for (const moduleName of modules) {
    //     const modul = require(`./${moduleName}`);
    //     if(typeof modul === "function") fitur[moduleName] = modul(config);
    //     else fitur[moduleName] = modul;

    //     if(typeof fitur[moduleName] == "object") for (const element of Object.keys(fitur[moduleName])) if(typeof fitur[moduleName][element]) fitur[element] = fitur[moduleName][element];
        
    // }


    return fitur;
}