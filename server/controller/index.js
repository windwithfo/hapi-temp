/**
 * @file home controller
 */

import React  from 'react';
import Render from 'react-dom/server';
import Page   from 'client/index/index';

const index = (request, reply) => {
  let data = {
    text: 'ssr',
    list: [
      {
        id: 1,
        name: 'emiya',
        age: 30,
        sex: 1
      },
      {
        id: 2,
        name: 'tom',
        age: 23,
        sex: 2
      },
      {
        id: 3,
        name: 'jack',
        age: 32,
        sex: 3
      }
    ]
  };
  const reactHtml = Render.renderToString(<Page initData={data}/>);
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
