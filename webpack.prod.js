const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()]
  },
  output: {
    filename: 'main.[contenthash:16].js',
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
        },
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
            minimize: true
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
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
      ],
  },
  plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './[name].[contenthash:16].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
        patterns: [
            { from: 'src/assets', to: 'assets/' },
        ],
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")],
            }),
    ]
};