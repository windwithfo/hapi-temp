/**
 * @file home controller
 */

import Page               from 'client/index/index';
import { createRenderer } from 'vue-server-renderer';

const renderer = createRenderer();

const index = (request, reply) => {
  let reactHtml = '';
  const data = {};
  renderer.renderToString(Page, (err, html) => {
    if (err) {
      throw err;
    }
    reactHtml = html;
    console.log(html);
  });
  reply.render('index/index', {
    assets: reply.assets('index'),
    title: 'hapi index',
    initData: JSON.stringify(data),
    reactHtml
  });
};

const home = (request, reply) => {
  request.yar.set('ts', { key: '123' });
  reply.render('detail', { title: 'hapi detail', data: request.payload });
};

export default {
  index,
  home
};
