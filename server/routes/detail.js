/**
 * @file detail router
 * @author windwithfo
 */

const base = 'detail';

const routes = [
  {
    method: 'GET',
    path: `/${base}/1`,
    handler: (request, reply) => reply('come detail page1')
  },
  {
    method: 'GET',
    path: `/${base}/2`,
    handler: (request, reply) => reply('come detail page2')
  }
];

export default routes;
