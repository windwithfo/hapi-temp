/**
 * @file store.js 页面状态机
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Vue    from 'vue';
import Vuex   from 'vuex';
import home   from './index/action';
import detail from './detail/action';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    modules: {
      home,
      detail
    }
  });
}
