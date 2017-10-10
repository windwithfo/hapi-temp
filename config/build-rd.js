/**
 * @file 构建文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import 'shelljs/global';
import ora     from 'ora';
import path    from 'path';
import webpack from 'webpack';
import nodecp  from 'child_process';
import Config  from './webpack.prod.config';
import Config2 from './webpack.release.config';

const spinner = ora('building for production...');

spinner.start();

rm('react.zip');
console.log('rm build.zip sucess');
rm('-rf', 'build');
console.log('rm build sucess');
mkdir('-p', 'build');
console.log('mkdir build sucess');
cp('assets/img/favicon.ico', 'build');
console.log('cp favicon.ico');
cp('package.json', 'build');
console.log('cp package.json');
cp('pm2.json', 'build');
console.log('cp pm2.json');
cp('-R', 'server/static/imgs', 'build');
console.log('cp imgs');
cp('-R', 'views', 'build');
console.log('cp views');

webpack(Config, function (err, stats) {
  if (err) {
    throw err;
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
  cp('configs/webpack-assets.json', 'build');
  console.log('cp webpack-assets.json');
  webpack(Config2, function (err, stats) {
    spinner.stop();
    if (err) {
      throw err;
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');
  });
});
