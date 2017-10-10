/**
 * @file 部署配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import webpack    from 'webpack';
import config     from './config';
import merge      from 'webpack-merge';
import webConfig  from './webpack.base.config.js';
// import Linter     from 'stylelint-webpack-plugin';
import Extract    from 'extract-text-webpack-plugin';

let webpackConfig = merge(webConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: Extract.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss',
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: Extract.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss',
              options: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'less'
            }
          ]
        })
      }
    ]
  },
  output: {
    path: config.output,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: config.build.publicPath
  },
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
});

export default {
  ...webpackConfig
};
