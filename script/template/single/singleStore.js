/**
 * @file 数据仓库
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {
  action,
  autorun,
  computed,
  observable
} from 'mobx';

class {{{Name}}}State {
  @observable homeText = 'store in home';
  @observable page1Text = 'store in page1';
  @observable page2Text = 'store in page2';

  constructor(data) {
    if (data) {
      this.homeText = data.homeText || '';
      this.page1Text = data.page1Text || '';
      this.page2Text = data.page2Text || '';
    }
    autorun(() => console.log(this.word));
  }

  @computed get word() {
    return 'The text is:' + this.page2Text;
  }

  @action textChange(text) {
    this.page2Text = text;
  }
}

export default {{{Name}}}State;
