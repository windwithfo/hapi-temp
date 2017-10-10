/**
 * @file 首页
 * @author dongkunshan(windwithfo@yeah.net)
 */

import './index.less';
import 'component/Hello.less';
import React        from 'react';
import Store        from './store';
import ReactDom     from 'react-dom';
import { observer } from 'mobx-react';
import Hello        from 'component/Hello';

import {
  DatePicker
} from 'antd';

const isNode = typeof window === 'undefined';

@observer
class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.store = new Store(props.initData);
  }

  render() {
    const handler = (event) => {
      this.store.text = event.target.value;
    };
    let items = this.store.list.map((item) => (
      <li key={item.id}>
        name:{item.name},
        age:{item.age},
        sex:
        {(() => {
          switch (item.sex) {
            case 1:return '男';
            case 2:return '女';
            default:return '未知';
          }
        })()}
      </li>
    ));

    return (
      <div>
        <label>label</label>
        <input defaultValue={this.store.text} onChange={handler} type="text"/>
        <Hello text="index"/>
        <p>click the button to pop from list</p>
        <button onClick={this.popList}>
          click me
        </button>
        <ul>
          {items}
        </ul>
        <DatePicker/>
      </div>
    );
  }

  popList = () => {
    this.store.popItem();
  }
}

if (!isNode) {
  ReactDom.render(<IndexPage initData={window.__initData}/>, document.getElementById('root'));
}

export default IndexPage;
