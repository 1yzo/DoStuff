const path = require('path');

module.exports = {
    mode: 'development',
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                   'style-loader',
                   'css-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    }
};