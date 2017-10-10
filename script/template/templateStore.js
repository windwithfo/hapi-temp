/**
 * @file 首页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  computed,
  observable
} from 'mobx';
import fetch from 'isomorphic-fetch';

class {{{Name}}}State {
  @observable list = [];

  constructor(data) {
    this.list = data || [];
  }

  @action fetchData() {
    fetch('/mock/test')
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((stories) => {
      console.log(stories);
      // this.list = stories.list;
    });
  }

  @action popItem() {
    this.list.pop();
    this.fetchData();
  }

  @computed get len() {
    return this.list.length;
  }
}

export default {{{Name}}}State;
