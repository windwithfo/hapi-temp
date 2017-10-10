/**
 * @file 新建页面脚本
 * @author dongkunshan(windwithfo@yeah.net)
 */

import fs       from 'fs';
import path     from 'path';
import inquirer from 'inquirer';
import entry    from '../client/entry';
import Stream   from './tools/ReplaceStream';

// 根目录
const ROOT     = path.resolve(__dirname, '../');
// 模板目录
const TEMPATH  = path.join(__dirname, 'template');
// js目录
const JSPATH   = path.join(ROOT, 'client');
// 页面目录
const PAGEPATH = path.join(ROOT, 'views');
// 控制器目录
const CTLPATH  = path.join(ROOT, 'server/controllers');

let options = {};

// options = {
//   path: 'test',
//   name: 'index',
//   bundle: 'testIndex',
//   controller: 'test'
// };
// generate(options);

getCustomConfig();

/**
* 获取用户输入的页面名，封装生成参数
*/
async function getCustomConfig() {
  // 获取页面名，处理页面路径
  let ret = await inquirer.prompt([
    // 获取要创建的模板类型
    {
      type: 'list',
      name: 'mode',
      message: '要创建的页面类型',
      choices: [
        {
          name: 'single page',
          value: 1
        },
        {
          name: 'multi page',
          value: 2
        }
      ]
    },
    {
      name: 'name',
      message: '请输入要创建的页面名字(eg: index/index)',
      default: 'index/index',
      validate: function (input) {
        options.path = path.dirname(input).replace('/', '');
        options.name = path.basename(input).replace('/', '');
        let done = this.async();
        if (fs.existsSync(path.join(PAGEPATH, options.path, options.name)
        + '.pug')) {
          done('The file has exists!!!', false);
          return;
        }
        done(null, true);
      }
    }
  ]);

  delete ret.name;

  // 根据页面名获取其他参数
  let tmp = await inquirer.prompt([
    // 获取绑定文件名
    {
      name: 'bundle',
      message: '请输入js文件绑定名字(eg: ' + options.path + options.name + ')',
      default: options.path + options.name,
      validate: function (input) {
        let done = this.async();
        if (entry.pages[input]) {
          done('The bundle has exists!!!', false);
          return;
        }
        done(null, true);
      }
    },
    // 获取控制器文件名
    {
      name: 'controller',
      message: '请输入控制器名字(eg: ' + options.path + ')',
      default: options.path
    }
  ]);

  Object.assign(options, tmp, ret);
  // console.log(options);
  generate(options);
}

/**
* 根据参数生成页面文件和相关文件
* @param  {String} options 页面参数
* @param  {String} options.name 页面文件名
* @param  {String} options.path 路径文件名
* @param  {String} options.bundle 绑定文件名
* @param  {String} options.store 存储文件名
* @param  {String} options.controller 控制器文件名
* @param  {Number} options.mode 页面类型  1、单页，2、多页
*/
function generate(options) {
  g_router(options.path);
  g_entry(options.path, options.name, options.bundle);
  g_pug(options.path, options.name, options.bundle);
  if (options.mode === 1) {
    g_ctl_single(options.path, options.name, options.bundle);
    g_store_single(options.path, options.name);
    g_less_single(options.path, options.name);
    g_jsx_single(options.path, options.name);
  }
  else {
    g_ctl(options.path, options.name, options.bundle);
    g_store(options.path, options.name);
    g_less(options.path, options.name);
    g_jsx(options.path, options.name);
  }

  console.log('generate page finish!');
}

/**
* 追加router
* @param  {String} filePath 文件路径
*/
function g_router(filePath) {
  fs.createReadStream(path.join(CTLPATH, '../', 'router.js'))
  .pipe(new Stream({
    'imp': `import ${filePath}Ctl from './controllers/${filePath}Controller';\r\n// imp`,
    'router': `router.use('/${filePath}', ${filePath}Ctl.routes(), \
    ${filePath}Ctl.allowedMethods());\r\n// router`
  }, true))
  .pipe(fs.createWriteStream(path.join(CTLPATH, '../', 'router.tmp.js'))
  .on('finish', () => {
    fs.unlinkSync(path.join(CTLPATH, '../', 'router.js'));
    fs.renameSync(path.join(CTLPATH, '../', 'router.tmp.js'),
    path.join(CTLPATH, '../', 'router.js'));
    console.log(path.join(CTLPATH, '../', 'router.js') + ' added code!');
  }));
}

/**
* 追加entry
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
* @param  {String} bundle 入口文件名
*/
function g_entry(filePath, name, bundle) {
  fs.createReadStream(path.join(JSPATH, 'entry.js'))
  .pipe(new Stream({
    'entry': '// entry\r\n    ' + bundle + ': \'client/' + filePath + '/'
    + name + '.jsx\','
  }, true))
  .pipe(fs.createWriteStream(path.join(JSPATH, 'entry.tmp.js'))
  .on('finish', () => {
    fs.unlinkSync(path.join(JSPATH, 'entry.js'));
    fs.renameSync(path.join(JSPATH, 'entry.tmp.js'), path.join(JSPATH, 'entry.js'));
    console.log(path.join(JSPATH, 'entry.js') + ' added code!');
  }));
}

/**
* 生成pug
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
* @param  {String} bundle 入口文件名
*/
function g_pug(filePath, name, bundle) {
  createFolder(path.join(PAGEPATH, filePath));
  fs.createReadStream(path.join(TEMPATH, 'template.pug'))
  .pipe(new Stream({
    bundle
  }))
  .pipe(fs.createWriteStream(path.join(PAGEPATH, filePath, name) + '.pug')
  .on('finish', () => {
    console.log(path.join(PAGEPATH, filePath, name) + '.pug created!');
  }));
}

/**
* 生成或追加controller
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
* @param  {String} bundle 入口文件名
*/
function g_ctl(filePath, name, bundle) {
  let Name = name.charAt(0).toUpperCase() + name.substr(1);
  if (!fs.existsSync(path.join(CTLPATH, filePath) + 'Controller.js')) {
    fs.createReadStream(path.join(TEMPATH, 'templateController.js'))
    .pipe(new Stream({
      Name,
      name,
      bundle,
      path: filePath
    }))
    .pipe(fs.createWriteStream(path.join(CTLPATH, filePath) + 'Controller.js')
    .on('finish', () => {
      console.log(path.join(CTLPATH, filePath) + 'Controller.js created!');
    }));
  }
  else {
    let tmp = `// 渲染${name}
    router.get('/${name}', assets('${bundle}'), async (ctx) => {
      let data = [
        {
          id: 1,
          name: 'emiya',
          age: 30,
          sex: 1
        },
        {
          id: 2,
          name: 'tom',
          age: 23,
          sex: 2
        },
        {
          id: 3,
          name: 'jack',
          age: 32,
          sex: 3
        }
      ];
      let reactHtml = Render.renderToString(<${Name}Page store={new Store(data)}/>);
      ctx.state.title = '${filePath}-${name}';
      await ctx.render('${filePath}/${name}', {
        initData: JSON.stringify(data),
        reactHtml
      });
    });
    `;
    fs.createReadStream(path.join(CTLPATH, filePath) + 'Controller.js')
    .pipe(new Stream({
      'imp': `import ${Name}Page from 'client/${filePath}/${name}';\r\n// imp`,
      'ctl': tmp + '\r\n// ctl'
    }, true))
    .pipe(fs.createWriteStream(path.join(CTLPATH, filePath) + 'Controller.tmp.js')
    .on('finish', () => {
      fs.unlinkSync(path.join(CTLPATH, filePath) + 'Controller.js');
      fs.renameSync(path.join(CTLPATH, filePath) + 'Controller.tmp.js',
      path.join(CTLPATH, filePath) + 'Controller.js');
      console.log(path.join(CTLPATH, filePath) + 'Controller.js added code!');
    }));
  }
}

/**
* 生成单页controller
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
* @param  {String} bundle 入口文件名
*/
function g_ctl_single(filePath, name, bundle) {
  let Name = name.charAt(0).toUpperCase() + name.substr(1);
  if (!fs.existsSync(path.join(CTLPATH, filePath) + 'Controller.js')) {
    fs.createReadStream(path.join(TEMPATH, 'single', 'singleController.js'))
    .pipe(new Stream({
      Name,
      name,
      bundle,
      path: filePath
    }))
    .pipe(fs.createWriteStream(path.join(CTLPATH, filePath) + 'Controller.js')
    .on('finish', () => {
      console.log(path.join(CTLPATH, filePath) + 'Controller.js created!');
    }));
  }
}

/**
* 生成store
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
*/
function g_store(filePath, name) {
  createFolder(path.join(JSPATH, filePath));
  let Name = name.charAt(0).toUpperCase() + name.substr(1);
  fs.createReadStream(path.join(TEMPATH, 'templateStore.js'))
  .pipe(new Stream({
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, name) + 'Store.js')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, name) + 'Store.js created!');
  }));
}

/**
* 生成单页store
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
*/
function g_store_single(filePath, name) {
  createFolder(path.join(JSPATH, filePath));
  let Name = name.charAt(0).toUpperCase() + name.substr(1);
  fs.createReadStream(path.join(TEMPATH, 'single' ,'singleStore.js'))
  .pipe(new Stream({
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, name) + 'Store.js')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, name) + 'Store.js created!');
  }));
}

/**
* 生成less
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
*/
function g_less(filePath, name) {
  fs.createReadStream(path.join(TEMPATH, 'template.less'))
  .pipe(new Stream({
    name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, name) + '.less')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, name) + '.less created!');
  }));
}

/**
* 生成单页less
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
*/
function g_less_single(filePath, name) {
  fs.createReadStream(path.join(TEMPATH, 'single', 'single.less'))
  .pipe(new Stream({
    name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, name) + '.less')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, name) + '.less created!');
  }));
}

/**
* 生成jsx
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
*/
function g_jsx(filePath, name) {
  let Name = name.charAt(0).toUpperCase() + name.substr(1);
  fs.createReadStream(path.join(TEMPATH, 'template.jsx'))
  .pipe(new Stream({
    name,
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, name) + '.jsx')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, name) + '.jsx created!');
  }));
}

/**
* 生成单页jsx
* @param  {String} filePath 文件路径
* @param  {String} name 文件名
*/
function g_jsx_single(filePath, name) {
  let Name = name.charAt(0).toUpperCase() + name.substr(1);
  fs.createReadStream(path.join(TEMPATH, 'single', 'single.jsx'))
  .pipe(new Stream({
    path: filePath,
    name,
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, name) + '.jsx')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, name) + '.jsx created!');
  }));

  fs.createReadStream(path.join(TEMPATH, 'single', 'home.jsx'))
  .pipe(new Stream({
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, 'home') + '.jsx')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, 'home') + '.jsx created!');
  }));

  fs.createReadStream(path.join(TEMPATH, 'single', 'page1.jsx'))
  .pipe(new Stream({
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, 'page1') + '.jsx')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, 'page1') + '.jsx created!');
  }));

  fs.createReadStream(path.join(TEMPATH, 'single', 'page2.jsx'))
  .pipe(new Stream({
    Name
  }))
  .pipe(fs.createWriteStream(path.join(JSPATH, filePath, 'page2') + '.jsx')
  .on('finish', () => {
    console.log(path.join(JSPATH, filePath, 'page2') + '.jsx created!');
  }));
}

function createFolder(to) {
  let sep = path.sep;
  let folders = to.split(sep);
  let p = '';
  while (folders.length) {
    p += folders.shift() + sep;
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }
}
