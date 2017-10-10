/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React        from 'react';
import { observer } from 'mobx-react';
// import {Button}   from 'antd-mobile';
// <Button type="primary" size="small">{this.props.store.homeText}</Button>

@observer
class DetailHome extends React.Component {
  render() {
    return (
      <div>
        this is {this.props.store.homeText}
      </div>
    );
  }
}

export default DetailHome;
