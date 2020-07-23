const path = require('path');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    mode: 'development',

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
        filename: '[name].js',
        chunkFilename: '[name].js',
        pathinfo: true,
    },

    optimization: {},

    target: 'web',
    devtool: 'cheap-module-eval-source-map',

    plugins: [
        new webpack.DefinePlugin({
            __PRODUCTION__: false,
            __STAGING__: false,
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, '../src/assets/'), to: 'assets' },
            path.resolve(
                __dirname,
                '../node_modules/@webcomponents/webcomponentsjs/**'
            ),
            path.resolve(__dirname, '../src/manifest.json'),
            path.resolve(__dirname, '../src/service_worker.js'),
        ]),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            template: path.resolve(__dirname, '../src/index.html'),
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
                                    modules: false,
                                    useBuiltIns: false,
                                    debug: true,
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
                            ],
                        },
                    },
                ],
            },
            // CSS
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                ],
            },
        ],
    },
};
