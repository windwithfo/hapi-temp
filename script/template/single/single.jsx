/**
 * @file 详情页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './{{{name}}}.less';
import 'component/Hello.less';
import React       from 'react';
import {{{Name}}}Home  from './home';
import {{{Name}}}Page1 from './page1';
import {{{Name}}}Page2 from './page2';
import ReactDom    from 'react-dom';
import Store       from './{{{name}}}Store';
import {
  NavLink,
  Route,
  BrowserRouter
} from 'react-router-dom';

const isNode = typeof window === 'undefined';
const supportsHistory = 'pushState' in window.history;

class {{{Name}}}Page extends React.Component {
  render() {
    return (
      <BrowserRouter basename="{{{path}}}" forceRefresh={!supportsHistory}>
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
            <{{{Name}}}Home store={this.props.store}/>
          )}/>
          <Route path="/page1/:userid?" render={({match}) => (
            <{{{Name}}}Page1
            store={this.props.store}
            userid={match.params.userid}/>
          )}/>
          <Route path="/page2" render={() => (
            <{{{Name}}}Page2 store={this.props.store}/>
          )}/>
        </div>
      </BrowserRouter>
    );
  }
}

if (!isNode) {
  ReactDom.render(<{{{Name}}}Page store={new Store(window.__initData)}/>,
  document.getElementById('root'));
}

export default {{{Name}}}Page;
