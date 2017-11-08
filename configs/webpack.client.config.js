/**
 * @file 开发配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import webpack    from 'webpack';
import config     from './config';
import merge      from 'webpack-merge';
import webConfig  from './webpack.base.config';
import Linter     from 'stylelint-webpack-plugin';
import Extract    from 'extract-text-webpack-plugin';
import SSRPlugin  from 'vue-server-renderer/client-plugin';

const webpackConfig = merge(webConfig, {
  entry: {
    app: config.dev.entry
  },
  output: {
    path: config.output,
    filename: 'js/[name].js',
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
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new Linter({
      configFile: '.stylelintrc.js',
      files: ['assets/style/*.less', 'client/**/*.less'],
      ignorePath: 'node_modules/*',
      syntax: 'less'
    }),
    new SSRPlugin(),
    // extract vendor chunks for better caching
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

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
//     // auto generate service worker
//     new SWPrecachePlugin({
//       cacheId: 'vue-hn',
//       filename: 'service-worker.js',
//       minify: true,
//       dontCacheBustUrlsMatching: /./,
//       staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//       runtimeCaching: [
//         {
//           urlPattern: '/',
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: /\/(top|new|show|ask|jobs)/,
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: '/item/:id',
//           handler: 'networkFirst'
//         },
//         {
//           urlPattern: '/user/:id',
//           handler: 'networkFirst'
//         }
//       ]
//     })
//   )
// };

export default webpackConfig;
