const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const  path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dost',
    },
    entry: './src/index.js',
    output: {
        filename: 'main.[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '方方',
            template: "src/assets/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/public/path/to/',
                        },
                    },
                    'css-loader',
                ],
                // use: ['style-loader', 'css-loader'],
            },
        ],
    },
};