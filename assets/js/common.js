/**
 * @file 通用文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

function formatTime(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
  let _n = n.toString();
  return _n[1] ? _n : '0' + _n;
}

export default {
  formatTime
};
