const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const commontConfig = require('./webpack.common')

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production',
    }),
    new CleanWebpackPlugin(),
]

module.exports = merge.smart(commontConfig, {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.min.js',
    },
    plugins,
})
