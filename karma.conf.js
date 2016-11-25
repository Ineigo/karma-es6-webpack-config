const webpack = require("webpack"),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");


console.log(process.argv);

module.exports = config => {
    config.set({

        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            '**/*.test.js'
        ],

        exclude: ['node_modules'],

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
                    {test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss!less?sourceMap')},
                    // {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss')},
                    // {test: /\.html$/, loader: 'html-loader'},
                    // {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader'},
                    // {test: /\.(eot|woff|woff2|ttf)$/, loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'},
                    {test: /\.hbs$/, loader: 'handlebars-loader'}
                ]
            },

            resolve: {
                modulesDirectories: ['node_modules', ''],
                alias: {
                    'inputmask.dependencyLib': 'jquery.inputmask/dist/inputmask/inputmask.dependencyLib.jquery',
                    inputmask: 'jquery.inputmask/dist/inputmask/inputmask'
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
    });
};