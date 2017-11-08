/**
 * @file server enter
 * @author dongkunshan(windwithfo@yeah.net)
 */

import Yar        from 'yar';
import path       from 'path';
import { Server } from 'hapi';
import inert      from 'inert';
import vision     from 'vision';
import routes     from './routes';
import swagger    from 'hapi-swagger';
import ssr        from './plugin/ssr';
// import assets     from './plugin/assets';
import template   from 'hapi-consolidate';
import config     from '../configs/config';
import async      from 'hapi-async-handler';
import staticFile from 'hapi-static-content';

const server = new Server();

server.connection({
  host: config.server.host,
  port: config.server.port
});

server.register([template, async, ssr], (err) => {
  if (err) {
    throw err;
  }
  server.consolidate({
    name: 'pug',
    path: path.resolve(path.join(__dirname, '../'), 'views'),
    extension: 'pug',
    options: {
      cache: false
    }
  });
});

server.register([
  inert,
  vision,
  {
    register: Yar,
    options: {
      cookieOptions: {
        password: 'the-password-must-be-at-least-32-characters-long',
        isSecure: false
      }
    }
  },
  {
    register: swagger,
    options: {
      info: {
        'title': 'Test API Documentation',
        'version': '1.0.0'
      }
    }
  }
], (err) => {
  if (err) {
    throw err;
  }
});

server.route(routes);

server.start((err) => {
  console.log(err ? err : `The server is run in ${config.server.host} on port ${config.server.port}`);
});
