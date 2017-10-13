require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: [
        './src/tracker/tracker.js'
    ],
    output: {
        filename: 'tracker.js',
        path: path.resolve(__dirname, '../../public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new MinifyPlugin(),
        new webpack.DefinePlugin({
            "hello": process.env.PORT
        }),
    ]
};