const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

const BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase: BUILD_DIR,
        compress: true,
        hot: true,
        open: true,
        historyApiFallback: true
    },
});