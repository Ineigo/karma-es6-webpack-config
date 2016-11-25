var karmaConf = require('./karma.conf.js'),
    merge = require('merge');

module.exports = function(options) {
    return function (config) {
        karmaConf = options ? merge(karmaConf, options) : karmaConf;
        config.set(karmaConf);
    };
}