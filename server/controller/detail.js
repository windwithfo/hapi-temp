/**
 * @file detail controller
 */

import React            from 'react';
import Render           from 'react-dom/server';
import Page             from 'client/detail/detail';
import { StaticRouter } from 'react-router-dom';

const handler = (request, reply) => {
  const data = {
    homeText: 'home',
    page1Text: 'page1',
    page2Text: 'page2'
  };
  let context = {};
  let reactHtml = Render.renderToString(
    <StaticRouter basename="detail" location={{ pathname: request.path }} context={context}>
      <Page initData={data}/>
    </StaticRouter>
  );
  reply.render('detail/detail', {
    assets: reply.assets('detail'),
    title: 'hapi detail',
    initData: JSON.stringify(data),
    reactHtml
  });
};

export default { handler };
