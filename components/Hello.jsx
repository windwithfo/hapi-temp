/**
 * @file 测试组件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import React from 'react';

function Component(props) {
  return (
    <div>
      <p className="title">Hello World!</p>
      <p>By Emiya</p>
      <p>page say: {props.text}</p>
    </div>
  );
}

export default Component;
