/**
 * @file 客户端热加载
 * @author dongkunshan(windwithfo@yeah.net)
 */

/* eslint-disable */
import 'eventsource-polyfill';
let hotClient = require('webpack-hot-middleware/client?noInfo=false&reload=true');

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload();
  }
});
