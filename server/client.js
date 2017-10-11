/**
 * @file server enter
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { Server }    from 'hapi';
import webpack       from 'webpack';
import config        from '../config/config';
import middleware    from 'hapi-webpack-plugin';
import webConfig     from '../config/webpack.dev.config';

const compiler = webpack(webConfig);
const server = new Server();
server.connection({
  host: config.dev.host,
  port: config.dev.port
});
server.register({
  register: middleware,
  options: {
    compiler,
    assets: {
      stats: {
        colors: true,
        chunks: false
      },
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    hot: {}
  }
});

server.start((err) => {
  console.log(err ? err : `The server for webpack is run in ${config.dev.host} on port ${config.dev.port}`);
});
