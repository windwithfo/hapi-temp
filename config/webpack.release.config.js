/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs      from 'fs';
import path    from 'path';
import webpack from 'webpack';
import config  from './config';
import Uglify  from 'uglifyjs-webpack-plugin';

let nodeModules = {};
fs.readdirSync('node_modules')
.filter(function (x) {
  return ['.bin'].indexOf(x) === -1;
})
.forEach(function (mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

let webpackConfig = {
  entry: config.server.entry,
  output: {
    path: config.output,
    filename: config.server.fileName
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../node_modules')
    ],
    alias: {
      component: 'components',
      assets: 'assets',
      noop: 'assets/js/noop'
    },
    extensions: ['.web.js', '.js', '.jsx', '.json', '.less', '.css']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.js(x)?$/,
        use: {
          loader: 'babel',
          query: {
            presets: [
              'es2015',
              'react',
              'stage-0'
            ],
            plugins: [
              'transform-decorators-legacy',
              'transform-runtime',
              ['import', {
                libraryName: 'antd',
                style: true
              }, {
                libraryName: 'antd-mobile',
                style: 'css'
              }]
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  externals: nodeModules,
  node: {
    __filename: false,
    __dirname: false
  },
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    new Uglify({
      sourceMap: config.server.sourceMap
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NormalModuleReplacementPlugin(
      /\.(css|less|png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
      'noop'),
    new webpack.IgnorePlugin(/\.(css|less)$/)
  ]
};

export default {
  ...webpackConfig
};
