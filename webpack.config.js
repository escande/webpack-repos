//const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  // entry: './src/index.js',
  // output: {
  //   filename: 'main.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  module: {
    rules: [
        {
          test: /\.css$/,
          exclude: /styles\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /styles\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            // Disables attributes processing
            sources: false,
            minimize: false
          },
        },
        {
          test: '/\.{png|svg|jpg|gif}$/',
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false
              }
            }
          ]
        },
      ],
  },
  plugins: [
          new HtmlWebPackPlugin({
              template: './src/index.html',
              filename: './index.html'
          }),
          new MiniCssExtractPlugin({
              filename: './[name].css',
              ignoreOrder: false
          }),
          new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },
            ],
          }),
        ]
};

// const HtmlWebPackPlugin = require('html-webpack-plugin');
 
// module.exports = {
 
//   mode: 'development',
//   module: {
//       rules: [
//           {
//               test: /\.html$/i,
//               loader: 'html-loader',
//               options: {
//                   attributes: false,
//               },
//           }
//       ]
//   },
//   plugins: [
//       new HtmlWebPackPlugin({
//           template: 'index.html',
//           filename: './index.html'
//       }),
//   ]
// };
