/**
 * @file home controller
 */
import fs   from 'fs';
import path from 'path';

const ignore = ['api', 'user'];
const serverInfo =
  `hapi/${require('hapi/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

const index = async (request, reply) => {
  const name = request.params.name;
  try {
    if (ignore.includes(name)) {
      console.log('ignore ' + name);
      return reply.continue();
    }
    if (name === 'js' || name === 'css' || name === 'img') {
      const filePath = path.resolve(__dirname, '../../build' + request.path);
      // const fileBuffer = fs.readFileSync(filePath);
      // if (name === 'css') {
      //   return reply(fileBuffer).type('text/css');
      // }
      return reply.file(filePath);
      // return reply(fileBuffer).type('application/javascript');
    }
    const options = {
      title: 'vue-ssr title',
      url: name
    };
    const html = await reply.ssr(options);
    return reply(html).type('text/html').header('Server', serverInfo);
  }
  catch (e) {
    console.log(e);
  }

  // reply.render('index/index', {
  //   title: 'hapi index',
  //   initData: JSON.stringify(data),
  //   reactHtml
  // });
};

const home = (request, reply) => {
  request.yar.set('ts', { key: '123' });
  reply.render('detail', { title: 'hapi detail', data: request.payload });
};

export default {
  index,
  home
};
