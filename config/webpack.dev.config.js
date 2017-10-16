/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import webpack    from 'webpack';
import config     from './config';
import merge      from 'webpack-merge';
import isoConfig  from './isomorphic.config';
import webConfig  from './webpack.base.config';
import Linter     from 'stylelint-webpack-plugin';
import Extract    from 'extract-text-webpack-plugin';

// add hot-reload related code to entry chunks
Object.keys(webConfig.entry).forEach(function (name) {
  webConfig.entry[name] = ['./config/client'].concat(webConfig.entry[name]);
});

let webpackConfig = merge(webConfig, {
  context: config.dev.context,
  output: {
    path: config.output,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js',
    publicPath: config.dev.publicPath
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue?$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  devtool: '#eval-source-map',
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new Linter({
      configFile: '.stylelintrc.js',
      files: ['assets/style/*.less', 'client/**/*.vue'],
      ignorePath: 'node_modules/*',
      syntax: 'less'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
});

export default {
  ...webpackConfig
};
