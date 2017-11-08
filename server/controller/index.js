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
  if (ignore.includes(name)) {
    console.log('ignore ' + name);
    return reply.continue();
  }
  if (name === 'js' || name === 'css') {
    const filePath = path.resolve(__dirname, '../../build' + request.path);
    const fileBuffer = fs.readFileSync(filePath);
    return reply(fileBuffer);
  }
  const options = {
    title: 'vue-ssr title',
    url: name
  };
  try {
    request.headers['Content-Type'] = 'text/html';
    request.headers['Server'] = serverInfo;
    const html = await reply.ssr(options);
    return reply(html);
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
