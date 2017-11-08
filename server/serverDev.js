/**
 * @file 打包服务配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs           from 'fs';
import path         from 'path';
import webpack      from 'webpack';
import chokidar     from 'chokidar';
import MFS          from 'memory-fs';
import WebpackDev   from 'webpack-dev-middleware';
import WebpackHot   from 'webpack-hot-middleware';
import clientConfig from '../configs/webpack.client.config';
import serverConfig from '../configs/webpack.server.config';

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
  }
  catch (e) {}
}

module.exports = function setupDevServer(server, templatePath, cb) {
  let bundle;
  let template;
  let clientManifest;

  let ready;
  const readyPromise = new Promise((r) => { ready = r });
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      });
    }
  };

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = 'js/[name].js';

  // dev middleware
  const clientCompiler = webpack(clientConfig);
  const devMiddleware = WebpackDev(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true
    },
    noInfo: true
  });

  // Handle webpackDevMiddleware
  server.ext('onRequest', (request, reply) => {
    const { req, res } = request.raw;
    devMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      reply.continue();
    });
  });

  clientCompiler.plugin('done', (stats) => {
    stats = stats.toJson();
    stats.errors.forEach((err) => console.error(err));
    stats.warnings.forEach((err) => console.warn(err));
    if (stats.errors.length) {
      return;
    }
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ));
    update();
  })

  // hot middleware
  const hotMiddleware = WebpackHot(clientCompiler, { heartbeat: 5000 });

  // Handle webpackHotMiddleware
  server.ext('onRequest', (request, reply) => {
    const { req, res } = request.raw;
    hotMiddleware(req, res, error => {
      if (error) {
        return reply(error);
      }
      reply.continue();
    });
  });

  // Expose compiler
  server.expose({clientCompiler});

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err;
    }
    stats = stats.toJson();
    if (stats.errors.length) {
      return;
    }

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
    update();
  })

  return readyPromise;
}