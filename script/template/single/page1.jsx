/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React      from 'react';
import {observer} from 'mobx-react';
import logo       from 'assets/img/logo.jpg';

@observer
class {{{Name}}}Page1 extends React.Component {
  render() {
    return (
      <div>
        <img src={logo}/>
        this is {this.props.store.page1Text}<br/>
        userid is {this.props.userid}
      </div>
    );
  }
}

export default {{{Name}}}Page1;
