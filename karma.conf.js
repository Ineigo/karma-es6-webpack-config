const webpack = require("webpack");
const path = require('path');

module.exports = function(config) {
    return {

        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            '**/*.test.js'
        ],

        exclude: ['**/node_modules/**/*.test.js'],

        frameworks: ['mocha', 'chai', 'sinon'],

        logLevel: config.LOG_INFO, //config.LOG_DISABLE, // config.LOG_INFO
        singleRun: true,

        preprocessors: {
            '**/*.test.js': ['webpack', 'sourcemap']
        },

        reporters: ['mocha'],

        webpack: {
            module: {
                devtool: 'inline-source-map',
                loaders: [

                    {
                        test: /\.js$/,
                        loader: 'babel',
                        exclude: /(node_modules|bower_components)/,
                        query: {
                            presets: [require.resolve('babel-preset-es2015'), require.resolve('babel-preset-react')], //
                            plugins: ['transform-class-properties']
                        }
                    },
                    { test: /\.less$/, loader:'null-loader'},
                    { test: /\.hbs$/, loader: 'handlebars-loader' }
                ]
            },

            resolve: {
                modulesDirectories: [
                    'node_modules', 'web_modules',
                    'node_modules'
                ],
                alias: {}
            }
        },
        webpackServer: {
            noInfo: true
        },

        plugins: [
            require("karma-webpack"),
            require("karma-mocha"),
            require("karma-chai"),
            require("karma-sinon"),
            require("karma-mocha-reporter"),
            require("karma-phantomjs-launcher"),
            require("karma-sourcemap-loader")
        ],

        browsers: ['PhantomJS'] // ['Chrome']
    }
};
