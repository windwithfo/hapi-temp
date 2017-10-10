/**
 * @file {{{name}}}
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React          from 'react';
import Router         from 'koa-router';
import Render         from 'react-dom/server';
import assets         from '../middleware/assets';
import Store          from 'client/{{{path}}}/{{{name}}}Store';
import {{{Name}}}Page from 'client/{{{path}}}/{{{name}}}';
// imp

const router = new Router();

// 渲染{{{name}}}
router.get('/{{{name}}}', assets('{{{bundle}}}'), async (ctx) => {
  let data = [
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
  ];
  let reactHtml = Render.renderToString(<{{{Name}}}Page store={new Store(data)}/>);

  ctx.state.title = '{{{path}}}-{{{name}}}';
  await ctx.render('{{{path}}}/{{{name}}}', {
    initData: JSON.stringify(data),
    reactHtml
  });
});

// ctl

export default router;
