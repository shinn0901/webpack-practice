const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const webpack = require('webpack')

const devConfig = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: '8070',
        // open: true,
        // publicPath: '/dist/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('./../config/dev.env')
        })
    ]
})

module.exports = devConfig