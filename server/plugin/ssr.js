/**
 * @file 服务端渲染中间件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs                       from 'fs';
import path                     from 'path';
import LRU                      from 'lru-cache';
import config                   from '../../configs/config';
import { createBundleRenderer } from 'vue-server-renderer';

const env = process.env.NODE_ENV;
const serverInfo =
  `hapi/${require('hapi/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    // cache: LRU({
    //   max: 1000,
    //   maxAge: 1000 * 60 * 15
    // }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: config.output,
    // recommended for performance
    runInNewContext: false
  }));
}

const vueSSRRender = function (server, options, next) {
  let renderer;
  let readyPromise;
  const htmlPath = path.resolve(__dirname, '../../client/index.html');

  const render = async (content) => {
    return new Promise((resolve, reject) => {
      renderer.renderToString(content, (err, html) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(html);
      });
    });
  };

  if (env === 'development') {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = require('../serverDev')(
      server,
      htmlPath,
      (bundle, options) => {
        renderer = createRenderer(bundle, options)
      }
    )
  }
  else {
    // In production: create server renderer using template and built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    const template = fs.readFileSync(htmlPath, 'utf-8');
    const bundle = require('../../build/vue-ssr-server-bundle.json');
    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.
    const clientManifest = require('../../build/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
      template,
      clientManifest
    })
  }

  const SSRRender = async (content) => {
    if (env === 'development') {
      return await readyPromise.then(async () => {
        return render(content);
      });
    }
    else {
      return await render(content);
    }
  };

  server.decorate('reply', 'ssr', SSRRender);
  next();
};

vueSSRRender.attributes = {
  name: 'vueSSRRender',
  version: '1.0.0'
};

export default vueSSRRender;
