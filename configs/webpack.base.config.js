/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path    from 'path';
import webpack from 'webpack';
import config  from './config';
import postcss from 'postcss-cssnext';
import Extract from 'extract-text-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

let webpackConfig = {
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      vue$: 'vue/dist/vue.js',
      component: 'components',
      assets: 'assets',
      client: 'client'
    },
    extensions: ['.js', '.vue', '.json', '.less', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
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
              postcss(require('autoprefixer'))
            ],
            extractCSS: isProduction
          }
        },
        exclude: /node_modules/
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
  },
  plugins: isProduction
    // make sure to add the plugin!
    ? [new Extract({
      filename: 'css/[name].[contenthash].css',
      disable: false,
      allChunks: true
    })]
    : []
};

export default webpackConfig;
