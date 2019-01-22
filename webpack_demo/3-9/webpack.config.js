var path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // insertInto: '#app',
                            singleton: true,
                            transform: './css.transform.js'
                        }
                        // loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true, 报错
                            modules: true,
                            // localIdentName: '[path][name]_[local]--[hash:base:5]' 报错
                        }
                        // loader: 'file-loader'
                    }
                ]
            }
        ]
    }
}