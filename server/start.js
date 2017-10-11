/**
 * @file 开发服务器总入口封装
 * @author dongkunshan(windwithfo@yeah.net)
 */

import 'babel-polyfill';
import path       from 'path';
import nodecp     from 'child_process';
import Isomorphic from 'webpack-isomorphic-tools';
import isoConfig  from '../config/isomorphic.config';

/* for antd-mobile ssr */
// import Hacker from 'require-hacker';

// Hacker.resolver((filename, module) => {
//   if (filename.endsWith('/style/css')) {
//     return Hacker.resolve(`${filename}.web.js`, module);
//   }
//   if (filename.match(/antd-mobile\/lib\/(\S*)/)) {
//     return Hacker.resolve(`${filename}/index.web.js`, module);
//   }
// });

// this must be equal to your Webpack configuration "context" parameter
const basePath = path.join(__dirname, '../');

// this global variable will be used later in express middleware
global.webpack_isomorphic_tools = new Isomorphic(isoConfig)
.server(basePath, () => {
  nodecp.exec('npm run lint', (err) => {
    if (err) {
      console.log(err);
    }
    else {
      require('./server.js');
    }
  });
});
