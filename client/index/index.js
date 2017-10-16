/**
 * @file home入口文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

// core js
import Vue from 'vue';

// global css
import 'assets/style/common';

// pages
import App from './App.vue';

// components
import {
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  select,
  option,
  tabs,
  tabPane,
  breadcrumb,
  breadcrumbItem,
  table,
  tableColumn,
  pagination,
  tree,
  menu,
  submenu,
  menuItem,
  Popover
} from 'element-ui';

// add reference
Vue.use(Select);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(select);
Vue.use(option);
Vue.use(tabs);
Vue.use(tabPane);
Vue.use(breadcrumb);
Vue.use(breadcrumbItem);
Vue.use(table);
Vue.use(tableColumn);
Vue.use(pagination);
Vue.use(tree);
Vue.use(menu);
Vue.use(submenu);
Vue.use(menuItem);
Vue.use(Popover);

const isNode = typeof window === 'undefined';

/* eslint-disable no-new */
const app = new Vue({
  ...App
});

if (!isNode) {
  app.$mount('#app');
}
