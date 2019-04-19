const jsLoader = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
    },
}

module.exports = {
    mode: 'none',
    module: {
        rules: [jsLoader],
    },
}
