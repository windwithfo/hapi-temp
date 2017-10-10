/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React from 'react';
import {observer} from 'mobx-react';

@observer
class {{{Name}}}Page2 extends React.Component {
  render() {
    return (
      <div>
        <input maxLength='25' value={this.props.store.page2Text} onChange={this.change}></input><br/>
        <button onClick={this.change}>click me to change text</button><br/>
        this is {this.props.store.page2Text}
      </div>
    );
  }

  change = (event) => {
    let val = event.target.value || 'change';
    this.props.store.textChange(val);
  }
}

export default {{{Name}}}Page2;
