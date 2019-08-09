const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
const CopyWebpack = require('copy-webpack-plugin')

const baseConfig = require('./../config/base.config')

const currentPath = './..'

const pathJoin = (dir) => path.join(__dirname, currentPath, dir)

const env = process.env.NODE_ENV
const isProduction = env === 'production'


const assetsPath = (fileCategory) => {
    const nameRules = (isProduction ? '[name].[chunkhash:5].' : '[name].') + fileCategory
    return path.join(baseConfig.assetsFolderName, fileCategory, nameRules)
}



module.exports = {
    mode: 'development',
    entry: {
        main: pathJoin('src/main.js'),
        test: pathJoin('src/main.test.js')
    },
    output: {
        filename: assetsPath('js'),
        chunkFilename: assetsPath('js'),
        path: pathJoin('dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
        alias: {
            '@': pathJoin('src')
        }
    },
    optimization: {
        splitChunks: {
            // chunks: 'initial',
            // minChunks: 1,
            automaticNameDelimiter: '.',
            // maxInitialRequests: 4,
            cacheGroups: {
                vendors: false,
                default: false,
                commonCss: {
                    chunks: 'all',
                    name: 'common',
                    test: /.css$/,
                    minChunks: 2
                }
                // default: {
                //     name: 'default'
                // }
                // vendors: false,
                // {
                //     test: /.js$/,
                //     chunks: 'all',
                //     // name: 'vendors',
                //     // minSize: 1000000
                // },
                // default: false,
                // vendor: {
                //     test: /.js$/,
                //     chunks: 'all'
                // }
                // jsMerge: {
                //     test: /.js$/,
                //     enforce: true,
                //     name: 'js-merge'
                // }
                // cssMerge: {
                //     test: /.css$/,
                //     // minChunks: 2,
                //     enforce: true,
                //     // chunks: 'all'
                //     // reuseExistingChunk: true
                //     // enforce: true,
                //     name: 'css-merge'
                // }
            }
        }
    },
    module: {
        rules: [{
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceMap: true,
                    }
                }
            },
            {
                test: /.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack 入门学习',
            template: pathJoin('src/html/index.html'),
            minify: isProduction ? {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            } : false,
            chunks: ['main', 'common']
        }),
        new HtmlWebpackPlugin({
            title: 'webpack 学习与测试',
            filename: 'test/test.html',
            template: pathJoin('src/html/test.html'),
            minify: isProduction ? {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            } : false,
            chunks: ['test', 'common']
        }),
        new MiniCssExtractPlugin({
            filename: assetsPath('css'),
            chunkFilename: assetsPath('css')
        }),
        new OptimizeCSSAssets(),
        new CopyWebpack([{
            from: pathJoin('src/assets/'),
            to: baseConfig.assetsFolderName,
            test: baseConfig.assetsResource
        }])
    ]
}