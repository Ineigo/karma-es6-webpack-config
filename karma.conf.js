const webpack = require("webpack");
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webstaticDir = '../../src/webStatic';

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
                        include: [
                            path.resolve(__dirname, '../@moedelo'),
                            path.resolve(__dirname, webstaticDir),
                        ],
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
                    'node_modules',
                    './node_modules/@moedelo/md-frontendcore',
                    './node_modules/@moedelo/frontend-enums',
                ],
                alias: {
                    'inputmask.dependencyLib': 'jquery.inputmask/dist/inputmask/inputmask.dependencyLib.jquery.js',
                    inputmask: 'jquery.inputmask/dist/inputmask/inputmask.js',
                    frontendCommon: '@moedelo/frontend-common',
                    frontendEnums: '@moedelo/frontend-enums'
                }
            },
            plugins: [
                new ExtractTextPlugin('[name].css')
            ]
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