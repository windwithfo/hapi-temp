/**
 * @file 入口配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

let pages = {
  // entry
  index: 'client/index/index.js',
  detail: 'client/detail/detail.js'
};

let vendors = {
  vendor: ['vue', 'vue-router', 'vuex']
};

export default {
  pages,
  vendors
};
