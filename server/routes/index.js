/**
 * @file home router
 * @author windwithfo
 */

import fs         from 'fs';
import path       from 'path';
import Joi        from 'joi';
import detail     from './detail';
import controller from '../controller/index';

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: controller.index
  },
  {
    method: 'GET',
    path: '/mock/{path*}',
    handler: (request, reply) => {
      const filePath = path.resolve(__dirname, '..' + request.path) + '.json';
      const fileBuffer = fs.readFileSync(filePath);
      reply(JSON.parse(fileBuffer));
    }
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    handler: (request, reply) => {
      process.send({ action: 'getFile', fileName: path.resolve(__dirname, '../..' + request.path) });
      process.on('message', (msg) => {
        console.log(msg);
        reply(msg);
      });
    }
  },
  // {
  //   method: 'GET',
  //   path: '/css/{path*}',
  //   handler: (request, reply) => {
  //     const filePath = path.resolve(__dirname, '..' + request.path);
  //     const fileBuffer = fs.readFileSync(filePath);
  //     reply(JSON.parse(fileBuffer));
  //   }
  // },
  // {
  //   method: 'GET',
  //   path: '/img/{path*}',
  //   handler: (request, reply) => {
  //     const filePath = path.resolve(__dirname, '..' + request.path);
  //     const fileBuffer = fs.readFileSync(filePath);
  //     reply(JSON.parse(fileBuffer));
  //   }
  // },
  {
    method: 'GET',
    path: '/favicon.ico',
    handler: (request, reply) => {
      const filePath = path.resolve(__dirname, '../../assets/img/favicon.ico');
      reply(fs.readFileSync(filePath));
    }
  },
  {
    method: 'POST',
    path: '/home',
    handler: controller.home,
    config: {
      auth: false,
      description: '登录操作',
      notes: '登录操作',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          username: Joi.string().trim().required().description('用户名'),
          password: Joi.string().trim().required().description('密码')
        })
      }
    }
  }
];

export default [...routes, ...detail];
