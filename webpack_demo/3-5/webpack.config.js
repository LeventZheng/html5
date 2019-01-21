var webpack = require('webpack');
var path  = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry : {
        'pageA': './src/pageA.js',
        'pageB': './src/pageB.js',
        'vendor': ['lodash']
    },
    output : {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        minimize: false,
        splitChunks:{
            chunks: "all",  //  async
            minChunks: 1,
            automaticNameDelimiter: '~'
        }
    }
}