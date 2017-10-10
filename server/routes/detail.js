/**
 * @file detail router
 * @author windwithfo
 */

import controller from '../controller/detail';

const routes = [
  {
    method: 'GET',
    path: '/detail/{path*}',
    handler: controller.handler
  }
];

export default routes;
