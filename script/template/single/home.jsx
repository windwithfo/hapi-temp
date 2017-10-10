/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React      from 'react';
import {observer} from 'mobx-react';
import {Button}   from 'antd-mobile';

@observer
class {{{Name}}}Home extends React.Component {
  render() {
    return (
      <div>
        <Button type="primary" size="small">{this.props.store.text}</Button>
        this is {this.props.store.homeText}
      </div>
    );
  }
}

export default {{{Name}}}Home;
