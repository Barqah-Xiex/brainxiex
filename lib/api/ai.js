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
    const baseURL = BASE+`/api/ai`;
    
    const toURL = require("./toURL");


    if(config.session_local) global.brainxiex.session[`ai/v1`] = global.brainxiex.session[`ai/v1`] || {};

    /**
     * Mengirimkan permintaan LLM (Large Language Model) ke server AI.
     *
     * @param {Object} payload - Objek data yang dikirimkan ke LLM.
     * @param {Array<Object>} [payload.messages=[{role: "user", content: "Halo, apa kabar?"}]] - Daftar pesan untuk LLM. Setiap pesan terdiri dari peran (role) dan konten (content).
     * @param {string} [payload.model="brainxiex"] - Nama model AI yang akan digunakan.
     * @param {string} [payload.sessionID] - ID sesi opsional untuk mempertahankan konteks percakapan.
     *
     * @returns {Promise<Object>} Hasil respon dari server AI, atau pesan kesalahan.
     */
    function LLM(payload) {
        const _payload = {...payload};
        // wajib
        _payload.messages = _payload.messages || [{role:"user",content:"Halo, apa kabar?"}];
        _payload.model = _payload.model || "brainxiex";

        // opsional
        // payload.sessionID bertipe String

        if(Boolean(_payload.sessionID)) delete _payload.sessionID;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apikey}`
        };
        return axios.post(baseURL+"/chat/completions",_payload,{headers})
        .then(r=>r.data)
        .then(r => {
            if(Boolean(payload.sessionID)){
                global.brainxiex.session[`ai/v1`][payload.sessionID] = r.messages;
            }
            return r;
        })
        .catch(e=>console.error(e)||{error: `${require(`util`).format(e)}`});
    }

    /**
     * Fungsi sederhana untuk mengirim prompt ke LLM.
     *
     * @param {string} prompt - Pesan atau prompt yang dikirim ke model AI.
     * @param {string} [model] - Nama model AI yang akan digunakan.
     * @param {string} [sessionID] - ID sesi opsional untuk mempertahankan konteks percakapan.
     * @param {string} [images] - URL gambar yang akan dikirimkan ke model AI.
     *
     * @returns {Promise<Object>} Hasil respon dari server AI, atau pesan kesalahan.
     */
    async function simple(prompt,model,sessionID="unknown",images = false){
        const content = `${prompt}${images ? `\n\n[IMAGE]\n${await toURL(images,"jpg")}`:''}`;
        return await LLM({
            messages: [{role:"user",content}],
            model,
            sessionID
        });
    }

    const ai = LLM;
    ai.LLM = LLM;
    ai.ai_simple = simple;

    return ai;
}

