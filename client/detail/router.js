/**
 * @file router
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Vue       from 'vue';
import VueRouter from 'vue-router';

// components
const Home = (resolve) => {
  require.ensure(['./Home'], () => {
    resolve(require('./Home'));
  });
};

const Page1 = (resolve) => {
  require.ensure(['./Page1'], () => {
    resolve(require('./Page1'));
  });
};

const Page2 = (resolve) => {
  require.ensure(['./Page2'], () => {
    resolve(require('./Page2'));
  });
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/page1',
    name: 'page1',
    component: Page1
  },
  {
    path: '/page2',
    name: 'page2',
    component: Page2
  }
];

const router = new VueRouter({
  routes
});

export default router;
