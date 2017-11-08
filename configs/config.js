/**
 * @file 配置文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path from 'path';

const port = 3000;

const config = {
  output: path.resolve(__dirname, '../build'),
  dev: {
    entry: path.resolve(__dirname, '../client/entry-client.js'),
    context: path.join(__dirname, '../'),
    publicPath: '/',
    // publicPath: '/dev/',
    host: '0.0.0.0',
    port,
    apiService: 'http://localhost:' + port
  },
  build: {
    publicPath: '/',
    apiService: 'http://localhost:' + port
  },
  server: {
    entry: path.resolve(__dirname, '../client/entry-server.js'),
    port: port,
    host: '0.0.0.0',
    fileName: 'server.js',
    sourceMap: false
  },
  proxys: [
    {
      path: '/rest/auth',
      target: 'config.proxy.auth',
      log: true,
      micro: true
    },
    {
      path: '/rest/auth',
      target: 'config.proxy.auth',
      log: true,
      rewrite: function (path) {
        return path.replace('/rest/auth', '');
      }
    }
  ]
};

export default config;
