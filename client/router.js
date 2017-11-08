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
      { name: 'home', path: '/index', component: () => import('./index/Index') },
      {
        name: 'detail',
        path: '/detail',
        component: () => import('./detail/Home'),
        children: [
          { name: 'detailpage1', path: 'page1/:id', component: () => import('./detail/Page1') },
          { name: 'detailpage2', path: 'page2', component: () => import('./detail/Page2') }
        ]
      }
    ]
  });
}
