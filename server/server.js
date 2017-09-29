/**
 * @file server enter
 * @author windwithfo
 */

import path     from 'path';
import {Server} from 'hapi';
import routes   from './routes';
import template from 'hapi-consolidate';

const port = 3000;
const host = '0.0.0.0';
const server = new Server();

server.connection({
  host,
  port,
});

server.register(template, (err) => {
  if (err) throw err;
  server.consolidate({
    name: "pug",
    path: path.resolve(path.join(__dirname, '../'), 'views'),
    extension: 'pug',
    options: {
      cache: false
    }
  });
});

server.route(routes);

server.start((err) => {
  console.log(err ? 'server start error' : `The server is run in ${host} on port ${port}`);
});
