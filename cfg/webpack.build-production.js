const path = require('path');

const webpack = require('webpack');
const customMinifyCSS = require('./customMinifyCSS');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {

    mode: 'production',

    entry: {
        bundle: './src/index.js',
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            Actions: path.resolve(__dirname, '../src/actions/'),
            Api: path.resolve(__dirname, '../src/api/'),
            Assets: path.resolve(__dirname, '../src/assets/'),
            Components: path.resolve(__dirname, '../src/components/'),
            Constants: path.resolve(__dirname, '../src/constants/'),
            Decorators: path.resolve(__dirname, '../src/decorators/'),
            Reducers: path.resolve(__dirname, '../src/reducers/'),
            Root: path.resolve(__dirname, '../src/'),
            Selectors: path.resolve(__dirname, '../src/selectors/'),
            Styles: path.resolve(__dirname, '../src/styles/'),
            Subscribers: path.resolve(__dirname, '../src/subscribers/'),
            Utils: path.resolve(__dirname, '../src/utils/'),
            Views: path.resolve(__dirname, '../src/views/'),
        },
    },

    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        pathinfo: true,
    },

    optimization: {
        nodeEnv: 'production',
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                parallel: true,
                sourceMap: true,
                extractComments: false,
            }),
        ],
    },

    target: 'web',
    devtool: 'source-map',

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '../src/assets/'), to: 'assets' },
            path.resolve(__dirname, '../src/manifest.json'),
        ]),
        new webpack.DefinePlugin({
            __PRODUCTION__: true,
            __STAGING__: false,
        }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            template: path.resolve(__dirname, '../src/index.html'),
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            include: ['index.html', 'manifest.json', /\.js$/],
            navigateFallback: 'index.html',
            swDest: 'service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [],
        }),
    ],

    module: {
        rules: [
            // JS
            {
                test: /\.js?$/,
                exclude: [
                    /(node_modules)/,
                    path.resolve(__dirname, '../src/assets'),
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        ie: '11',
                                    },
                                    useBuiltIns: false,
                                    debug: false,
                                    exclude: [
                                        '@babel/plugin-transform-classes',
                                    ],
                                }],
                            ],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import',
                                ['@babel/plugin-proposal-decorators', {
                                    decoratorsBeforeExport: true,
                                }],
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-optional-chaining',
                                '@babel/plugin-proposal-function-bind',
                                ['template-html-minifier', {
                                    modules: {
                                        'lit-html': ['html'],
                                        'lit-element': [
                                            'html',
                                            {
                                                name: 'css',
                                                encapsulation: 'style',
                                            },
                                        ],
                                    },
                                    htmlMinifier: {
                                        collapseWhitespace: true,
                                        removeComments: true,
                                        caseSensitive: true,
                                        minifyCSS: customMinifyCSS,
                                    },
                                }],
                            ],
                        },
                    },
                ],
            },
            // CSS
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
        ],
    },
};
