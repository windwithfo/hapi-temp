/**
* @file 静态资源中间件
* @author dongkunshan(windwithfo@yeah.net)
*/

import fs         from 'fs';
import path       from 'path';
import assetsJson from '../../config/webpack-assets.json';

let assets = assetsJson;

const assetsLoader = function (server, options, next) {
  const getAssets =  function (assetsName) {
    if (process.env.NODE_ENV !== 'development') {
      const assetsBuffer = fs.readFileSync(path.resolve(__dirname,
        '../../config/webpack-assets.json'));
      assets = JSON.parse(assetsBuffer);
    }
    return {
      styles: {
        [assetsName]: assets.styles[assetsName],
        vendor: assets.styles.vendor
      },
      javascript: {
        [assetsName]: assets.javascript[assetsName],
        vendor: assets.javascript.vendor,
        manifest: assets.javascript.manifest
      }
    };
  };
  server.decorate('reply', 'assets', getAssets);
  next();
};

assetsLoader.attributes = {
  name: 'assetsLoader',
  version: '1.0.0'
};

export default assetsLoader;
