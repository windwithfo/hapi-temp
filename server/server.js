/**
 * @file server enter
 * @author windwithfo
 */

import Yar        from 'yar';
import path       from 'path';
import inert      from 'inert';
import vision     from 'vision';
import { Server } from 'hapi';
import routes     from './routes';
import swagger    from 'hapi-swagger';
import template   from 'hapi-consolidate';
import async      from 'hapi-async-handler';

const port = 3000;
const host = '0.0.0.0';
const server = new Server();

server.connection({
  host,
  port
});

server.register([template, async], (err) => {
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
  console.log(err ? err : `The server is run in ${host} on port ${port}`);
});
