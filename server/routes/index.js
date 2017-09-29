/**
 * @file home router
 * @author windwithfo
 */

import detail     from './detail';
import controller from '../controller/index';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: controller.index,
  },
  {
    method: 'GET',
    path: '/home',
    handler: controller.home,
  },
];

export default [...routes, ...detail];
