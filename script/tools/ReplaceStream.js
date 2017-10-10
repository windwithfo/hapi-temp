/**
 * @file 转换流实现类
 * @author dongkunshan(windwithfo@yeah.net)
 */

import {Transform} from 'stream';

class ReplaceStream extends Transform {
  constructor(opt = {}, flag = false) {
    super();
    this.options = opt;
    this.flag = flag;
  }
  _transform(chunk, encoding, callback) {
    let text = chunk.toString();
    Object.keys(this.options).forEach((key) => {
      let value = this.options[key];
      if (this.flag) {
        text = text.replace(new RegExp('// ' + key, 'gm'), value);
      }
      else {
        text = text.replace(new RegExp('{{{' + key + '}}}', 'gm'), value);
      }
    });
    callback(null, text);
  }
}

export default ReplaceStream;
