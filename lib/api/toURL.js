const axios = require("axios");
const fs = require("fs");
const path = require("path");

/**
 * Mengkonversi file atau buffer menjadi URL yang dapat diunggah ke server.
 *
 * @param {Buffer|string} file_or_buffer - Buffer, path file, atau URL file.
 * @param {string} [extension] - Ekstensi file jika input berupa buffer atau URL tanpa ekstensi.
 *
 * @returns {Promise<string>} URL file yang diunggah atau pesan kesalahan.
 */
async function toURL(file_or_buffer, extension) {
    // Jika input adalah buffer
    if (Buffer.isBuffer(file_or_buffer)) {
        if (!extension) return "extension not found please use extension like \"jpg\", \"png\", \"mp4\", \"mp3\", ...more";
        return uploadBuffer(file_or_buffer, extension);

    // Jika input adalah path file
    } else if (fs.existsSync(file_or_buffer)) {
        const data = fs.readFileSync(file_or_buffer).toString("base64");
        return uploadFile(data, file_or_buffer);

    // Jika input adalah URL file
    } else if (typeof file_or_buffer === "string" && file_or_buffer.startsWith("http")) {
        try {
            const response = await axios.get(file_or_buffer, { responseType: "arraybuffer" });
            const buffer = Buffer.from(response.data, "binary");
            const fileExtension = path.extname(new URL(file_or_buffer).pathname).slice(1) || extension;
            return uploadBuffer(buffer, fileExtension);
        } catch (error) {
            return "Failed to download URL";
        }

    // Jika input tidak ditemukan
    } else {
        return "file not found";
    }
}

/**
 * Mengunggah buffer ke server dengan ekstensi yang ditentukan.
 *
 * @param {Buffer} buffer - Buffer file yang akan diunggah.
 * @param {string} extension - Ekstensi file yang sesuai dengan tipe buffer.
 *
 * @returns {Promise<string>} URL file yang diunggah atau pesan kesalahan.
 */
function uploadBuffer(buffer, extension) {
    const data = buffer.toString("base64");
    return uploadFile(data, "brainxiex-uploader." + extension);
}

/**
 * Mengunggah file yang dikodekan dengan base64 ke server.
 *
 * @param {string} data - Data file dalam format base64.
 * @param {string} name - Nama file yang akan diunggah.
 *
 * @returns {Promise<string>} URL file yang diunggah atau pesan kesalahan.
 */
function uploadFile(data, name) {
    return axios.post(`http://upload.xiex.my.id/`, { file: { data, name } })
        .then(v => v.data)
        .catch(e => "server down");
}

module.exports = toURL;
