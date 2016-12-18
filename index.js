var karmaConf = require('./karma.conf.js'),
    merge = require('merge');

module.exports = function(options) {
    return function (config) {
        config.set(options ? merge(true, karmaConf(config), options) : karmaConf(config));
    };
}