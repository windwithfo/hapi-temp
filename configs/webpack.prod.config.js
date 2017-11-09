/**
 * @file 部署配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import webpack    from 'webpack';
import config     from './config';
import merge      from 'webpack-merge';
import Uglify     from 'uglifyjs-webpack-plugin';
import webConfig  from './webpack.base.config.js';
import Extract    from 'extract-text-webpack-plugin';
import SSRPlugin  from 'vue-server-renderer/client-plugin';

let webpackConfig = merge(webConfig, {
  entry: {
    app: config.dev.entry
  },
  output: {
    path: config.output,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js',
    publicPath: config.build.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: Extract.extract({
          fallback: 'style',
          use: {
            loader: 'css',
            options: {
              minimize: true
            }
          }
        })
      },
      {
        test: /\.less$/,
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
              loader: 'less'
            }
          ]
        })
      }
    ]
  },
  performance: {
    hints: false
  },
  // 插件项
  plugins: [
    new SSRPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Uglify({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        VUE_ENV: '"client"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    })
  ]
});

export default webpackConfig;
