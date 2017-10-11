/**
 * @file server enter
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { Server }    from 'hapi';
import webpack       from 'webpack';
import cluster       from 'cluster';
import chokidar      from 'chokidar';
import nodecp        from 'child_process';
import config        from '../config/config';
import middleware    from 'hapi-webpack-plugin';
import webConfig     from '../config/webpack.dev.config';

if (cluster.isMaster) {
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

  let worker = cluster.fork({ 'NODE_ENV': 'development' }).on('listening', (address) => {
    console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid}, `
    + `Address:${address.address} :${address.port}`);
  });
  const watchConfig = {
    dir: ['server'],
    options: {}
  };
  chokidar.watch(watchConfig.dir, watchConfig.options).on('change', (path) => {
    console.log(`${path} changed`);
    worker.kill();
    worker = cluster.fork({ 'NODE_ENV': 'development' }).on('listening', (address) => {
      console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid}, `
      + `Address:${address.address} :${address.port}`);
    });
  });
}

if (cluster.isWorker) {
  nodecp.exec('npm run lint', (err) => {
    if (err) {
      console.log(err);
    }
    else {
      require('./start.js');
    }
  });
}
