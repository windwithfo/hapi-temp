/**
 * @file server enter
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { Server } from 'hapi';
import webpack    from 'webpack';
import cluster    from 'cluster';
import chokidar   from 'chokidar';
import nodecp     from 'child_process';
import config     from '../config/config';
import middleware from 'hapi-webpack-plugin';
import webConfig  from '../config/webpack.dev.config';

if (cluster.isMaster) {
  const compiler = webpack(webConfig);
  const server = new Server();
  server.connection({
    host: config.server.host,
    port: config.server.port
  });
  server.register({
    register: middleware,
    options: {
      compiler,
      assets: {
        stats: {
          colors: true,
          chunks: false
        }
      },
      hot: {
        reload: true
      }
    }
  });

  cluster.on('message',  (worker, msg) => {
    switch (msg.action) {
      case 'getFile':
        const fileName = msg.fileName;
        console.log(fileName);
        console.log(compiler.outputFileSystem);
        const content = compiler.outputFileSystem.readFileSync(fileName).toString();
        worker.send(content);
        break;
      default:

    }
  });

  let worker = cluster.fork().on('listening', (address) => {
    console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid}, `
    + `Address:${address.address} :${address.port}`);
  });
  const watchConfig = {
    dir: ['server'],
    options: {}
  };
  chokidar.watch(watchConfig.dir, watchConfig.options).on('change', (path) => {
    console.log(`${path} changed`);
    nodecp.exec('npm run lint', (err) => {
      if (err) {
        console.log(err);
      }
    });
    worker.kill();
    worker = cluster.fork().on('listening', (address) => {
      console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid}, `
      + `Address:${address.address} :${address.port}`);
    });
  });
}
else {
  require('./start.js');
}
