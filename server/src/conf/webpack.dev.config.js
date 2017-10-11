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
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        compress: true,
        historyApiFallback: true,
        hot: true,
        port: 4000
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
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.DefinePlugin({
            "SERVER_URL": JSON.stringify(process.env.SERVER_URL)
        }),
    ]
};