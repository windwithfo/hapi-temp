/**
 * @file 首页数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  autorun,
  computed,
  observable
} from 'mobx';
import fetch from 'isomorphic-fetch';

class IndexState {
  @observable list = [];
  @observable text = 'title';

  constructor(data) {
    this.list = data.list || [];
    this.text = data.text || '';
    autorun(() => console.log(this.word));
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

  @computed get word() {
    return this.text;
  }

  @computed get len() {
    return this.list.length;
  }
}

export default IndexState;
