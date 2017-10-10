/**
 * @file 入口配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

let pages = {
  // entry
  index: 'client/index/index.jsx',
  detail: 'client/detail/detail.jsx'
};

let vendors = {
  vendor: ['react', 'react-dom', 'mobx', 'mobx-react']
};

export default {
  pages,
  vendors
};
