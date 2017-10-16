/**
 * @file Router
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Vue    from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./detail/Home') },
      { path: '/page1/:id', component: () => import('./detail/Page1') },
      { path: '/page2', component: () => import('./detail/Page2') }
    ]
  });
}
