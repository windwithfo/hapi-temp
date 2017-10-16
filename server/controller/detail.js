/**
 * @file detail controller
 */

import Page             from 'client/detail/detail';
import { createRenderer } from 'vue-server-renderer';

const renderer = createRenderer();

const handler = (request, reply) => {
  const data = {
    homeText: 'home',
    page1Text: 'page1',
    page2Text: 'page2'
  };
  let reactHtml = '';
  renderer.renderToString(Page, (err, html) => {
    if (err) {
      throw err;
    }
    reactHtml = html;
    console.log(html);
  });
  reply.render('detail/detail', {
    assets: reply.assets('detail'),
    title: 'hapi detail',
    initData: JSON.stringify(data),
    reactHtml
  });
};

export default { handler };
