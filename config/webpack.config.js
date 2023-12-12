/*
 * @Author: tommyxia 709177815@qq.com
 * @Date: 2023-10-19 10:00:50
 * @LastEditors: tommyxia 709177815@qq.com
 * @LastEditTime: 2023-12-11 09:58:23
 * @FilePath: /chrome-extension/config/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const clean = require('./clean')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack');
clean()

const isProduction = process.env.NODE_ENV === 'production'
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const config = {
  entry: { app: './src/index.tsx', boot: './src/boot.ts', inject: './src/inject.ts', background: './src/background.ts' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      excludeChunks: ['boot', 'inject', 'background']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ['ts-loader'],
        exclude: ['/node_modules/']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset'
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    client: {
      webSocketURL: 'ws://localhost:9000/ws'
    },
    allowedHosts: 'all',
    hot: true,
    devMiddleware: {
      writeToDisk: true
    },

    port: 9000
  }
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'

    config.plugins.push(new MiniCssExtractPlugin())
    config.plugins.push(
      new Dotenv({
        path: './.env.production',
      }))
  } else {
    config.mode = 'development'
    config.plugins.push(
      new Dotenv({
        path: './.env.dev',
      }))
  }
  return config
}
