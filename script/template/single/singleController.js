/**
 * @file 详情页相关路由处理
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React       from 'react';
import Router      from 'koa-router';
import Render      from 'react-dom/server';
import {{{Name}}}Home  from 'client/{{{path}}}/home';
import {{{Name}}}Page1 from 'client/{{{path}}}/page1';
import {{{Name}}}Page2 from 'client/{{{path}}}/page2';
import assets      from '../middleware/assets';
import Store       from 'client/{{{path}}}/{{{name}}}Store';
import {
  NavLink,
  Route,
  StaticRouter
} from 'react-router-dom';

const router = new Router();

// 页渲染
router.get('/:paganame?/:arg?', assets('{{{bundle}}}'), async (ctx) => {
  let context = {};
  let store = new Store();
  let pagename = ctx.params.paganame;
  let reactHtml = Render.renderToString(
    <StaticRouter basename="{{{path}}}"
      location={{pathname: ctx.url}} context={context}>
      <div className="{{{name}}}">
        <ul>
          <li><NavLink activeClassName="active"
            to="/" exact>{{{Name}}}Home</NavLink></li>
          <li><NavLink activeClassName="active"
            to="/page1/123">{{{Name}}}Page1</NavLink></li>
          <li><NavLink activeClassName="active"
            to="/page2">{{{Name}}}Page2</NavLink></li>
        </ul>
        <Route exact path="/" render={() => (
            <{{{Name}}}Home store={store}/>
        )}/>
        <Route path="/page1/:userid?" render={({match}) => (
            <{{{Name}}}Page1 store={store} userid={match.params.userid}/>
        )}/>
        <Route path="/page2" render={() => (
            <{{{Name}}}Page2 store={store}/>
        )}/>
      </div>
    </StaticRouter>
  );
  ctx.state.title = 'React {{{name}}}';
  switch (pagename) {
    case 'page1':
    ctx.state.title = 'React {{{name}}} page1';
    break;
    case 'page2':
    ctx.state.title = 'React {{{name}}} page2';
    break;
  }
  await ctx.render('{{{path}}}/{{{name}}}', {
    reactHtml,
    initData: '""'
  });
});

// ctl

export default router;
