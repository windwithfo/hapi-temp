/**
 * @file vue enter
 * @author windwithfo(windwithfo@yeah.net)
 */

// add mint-ui components
import 'babel-polyfill';
// import 'component/config';
import Vue         from 'vue';
import store       from './store';
import router      from './router';
import App         from './App.vue';

// global css
System.import('assets/style/common');

Vue.config.debug = false;

const isNode = typeof window === 'undefined';

const app = new Vue({
  router,
  store,
  ...App
});

if (!isNode) {
  app.$mount('#app');
}
