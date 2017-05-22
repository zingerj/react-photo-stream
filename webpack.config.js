 var path = require('path');
 var webpack = require('webpack');
 var HTMLWebpackPlugin = require('html-webpack-plugin');
 var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
 });

 var DefinePlugin = new webpack.DefinePlugin({
  API_KEY: JSON.stringify('563492ad6f917000010000010ffdc1361bab44156e895c10c03716b6')
});

 module.exports = {
     entry: './app/app.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
            {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: '/node_modules/'
            },
            {
              test: /\.css$/,
              loader: 'style-loader'
            },
            {
              test: /\.css$/,
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     plugins: [HTMLWebpackPluginConfig, DefinePlugin]
 };
