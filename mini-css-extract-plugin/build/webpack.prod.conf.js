const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')


const prodConfig = merge(baseConfig, {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': require('./../config/prod.env')
        })
    ]
})

module.exports = prodConfig