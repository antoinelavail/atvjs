const webpack = require('webpack'),
  root = __dirname + '/src',
  entry = {
      app: './src/index.js'
  },
  output = {
      path: __dirname,
      library: 'ATV',
      libraryTarget: 'umd',
      globalObject: 'this'
  },
  plugins = [new webpack.BannerPlugin('Copyright (c) Emad Alam http://emad.in\nhttps://github.com/emadalam/atvjs')];

module.exports.development = {
    mode: 'development',
    entry: entry,
    output: Object.assign({}, output, {filename: 'atv.js'}),
    resolve: {
        modules: [
            'node_modules',
            root
        ]
    },
    plugins: plugins,
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules|bower_components|native/,
            use: 'babel-loader'
        }]
    }
};

module.exports.production = {
    mode: 'production',
    entry: entry,
    output: Object.assign({}, output, {filename: 'atv.min.js'}),
    resolve: {
        modules: [
            'node_modules',
            root
        ]
    },
    plugins: plugins,
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules|bower_components|native/,
            use: 'babel-loader'
        }]
    }
};

module.exports.test = {
    resolve: {
        modules: [
            'node_modules',
            root
        ]
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules|bower_components|native/,
            use: 'babel-loader'
        }]
    }
};