const axios = require('axios');
const toURL = require('./toURL');

/**
 * AI API module
 * @param {Object} config
 * @param {string} config.apikey
 * @param {string} config.BASE
 * @param {boolean} config.session_local
 */
module.exports = function (config) {
  const { apikey, BASE, session_local } = config;
  const baseURL = `${BASE}/api/ai`;

  if (session_local && typeof global !== 'undefined') {
    global.brainxiex = global.brainxiex || {};
    global.brainxiex.session = global.brainxiex.session || {};
    global.brainxiex.session['ai/v1'] = global.brainxiex.session['ai/v1'] || {};
  }

  /**
   * Send an LLM request to the remote AI endpoint.
   * @param {Object} payload
   * @param {Array<{role:string,content:string}>} [payload.messages]
   * @param {string} [payload.model]
   * @param {string} [payload.sessionID]
   * @returns {Promise<Object>} resolved response or error object
   */
  async function LLM(payload = {}) {
    const _payload = Object.assign(
      {
        messages: [{ role: 'user', content: 'Halo, apa kabar?' }],
        model: 'brainxiex',
      },
      payload
    );

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apikey}`,
    };

    try {
      const res = await axios.post(`${baseURL}/chat/completions`, _payload, { headers });
      const data = res.data;

      if (payload.sessionID && session_local && global.brainxiex && global.brainxiex.session) {
        global.brainxiex.session['ai/v1'][payload.sessionID] = data.messages;
      }

      return data;
    } catch (err) {
      return { error: err.message || String(err) };
    }
  }

  /**
   * Simple helper that sends a single prompt as a user message.
   * @param {string} prompt
   * @param {string} [model]
   * @param {string} [sessionID]
   * @param {string|Buffer} [images]
   */
  async function simple(prompt, model, sessionID = undefined, images = false) {
    let content = String(prompt || '');
    if (images) {
      const imgUrl = await toURL(images, 'jpg').catch(() => null);
      if (imgUrl) content += `\n\n[IMAGE]\n${imgUrl}`;
    }

    return LLM({ messages: [{ role: 'user', content }], model, sessionID });
  }

  const ai = LLM;
  ai.LLM = LLM;
  ai.simple = simple;

  return ai;
};
