/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

import path from 'path';

export default {
  webpack_assets_file_path: path.resolve(__dirname, './webpack-assets.json'),
  alias: {
    client: path.resolve(__dirname, '../client'),
    assets: path.resolve(__dirname, '../assets'),
    component: path.resolve(__dirname, '../components')
  },
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    fonts: {
      extensions: ['woff', 'ttf', 'eot', 'otf']
    },
    styles: {
      extensions: ['less', 'css']
    }
  }
};
