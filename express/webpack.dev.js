const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const sourceCodes = [{
    entry: {
        "app": path.resolve(__dirname, "react/index.tsx")
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: "[name].js",
        library: 'App',
        libraryTarget: 'umd',
    },
}];
module.exports = sourceCodes.map(k => {
    return merge(common, {
        ...k,
        mode: 'development',
        devtool: 'inline-source-map',
    })
});