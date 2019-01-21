module.exports = {
    mode: 'development',
    entry : {
        app : './app.js'
    },
    output : {
        filename: '[name].[hash:8].js'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                // use: 'babel-loader',
                use: {
                    loader: 'babel-loader',
                    // 这里是配置polyfill 
                    // options : {
                    //     presets: ['@babel/preset-env', {
                    //         targets: {
                    //             browser: ['> 1%', 'last 2 versions']
                    //             // chrome : '52'
                    //         }
                    //     }]
                    // }  
                },
                exclude: '/node_modules'
            }
        ]
    }
}