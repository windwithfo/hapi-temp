/**
 * @file 构建文件
 * @author dongkunshan(windwithfo@yeah.net)
 */

import ora     from 'ora';
import webpack from 'webpack';
import Config  from './webpack.release.config';

const spinner = ora('building for production...');

spinner.start();

webpack(Config, function (err, stats) {
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
