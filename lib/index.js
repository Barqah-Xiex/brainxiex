/**
 * Compose and expose submodules under `lib/`
 * @param {Object} config - configuration passed down to submodules
 * @returns {Object} features grouped under `api` namespace
 */
module.exports = function (config) {
  const api = require('./api')(config);

  return { api };
};
