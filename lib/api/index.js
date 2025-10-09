/**
 * Initialize API modules under `lib/api`
 * @param {Object} config
 * @param {string} config.apikey
 * @param {string} config.BASE
 * @param {boolean} config.session_local
 */
module.exports = function (config) {
  return {
    ai: require('./ai')(config),
    downloader: require('./downloader')(config),
    image: require('./image')(config),
    media2buffer: require('./media2buffer'),
    minigame: require('./minigame')(config),
    random: require('./random')(config),
    search: require('./search')(config),
    tools: require('./tools')(config),
    stalk: require('./stalk')(config),
    toURL: require('./toURL'),
  };
};
