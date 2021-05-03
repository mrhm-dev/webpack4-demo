const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        open: true,
        port: 8080,
        compress: true,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                },
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new CleanWebpackPlugin('dist'),
    ],
};
