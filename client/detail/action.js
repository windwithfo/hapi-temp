/**
 * @file action.js 页面状态维护
 * @author dongkunshan(windwithfo@yeah.net)
 */

import { user } from 'assets/js/api';

const state = {
  count: 0,
  msg: ''
};

const mutations = {
  add(state) {
    // 变更状态
    state.count++;
  },
  setCount(state, count) {
    state.count = count;
  },
  setMsg(state, msg) {
    state.msg = msg;
  }
};

const actions = {
  async getData({ commit }, num) {
    console.log(num);
    const ret = await user.getJson('/mockData/test.json');
    console.log('ret', ret);
    commit('setMsg', 'fetch data');
  }
};

const getters = {
  count: (state) => {
    return state.count;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
