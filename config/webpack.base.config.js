/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import entry   from '../client/entry';
import postcss from 'postcss-cssnext';
import Extract from 'extract-text-webpack-plugin';

let entries = Object.assign({}, entry.pages, entry.vendors);

let webpackConfig = {
  entry: entries,
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      component: 'components',
      assets: 'assets',
      page: 'pages'
    },
    extensions: ['.js', '.vue', '.json', '.less', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new Extract({
      filename: 'css/[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: {
          loader: 'babel',
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue',
          options: {
            postcss: [
              postcss()
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: Extract.extract({
          fallback: 'style',
          use: {
            loader: 'css'
          }
        })
      },
      {
        test: /\.less$/,
        loader: Extract.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css'
            },
            {
              loader: 'less'
            }
          ]
        })
      },
      {
        test: /\.json$/,
        use: [{
          loader: 'json'
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: 'url',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  }
};

export default {
  ...webpackConfig
};
