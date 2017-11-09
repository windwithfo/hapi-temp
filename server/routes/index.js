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
    path: '/{name}/{path*}',
    handler: controller.index
  },
  {
    method: 'GET',
    path: '/api/v1/{path*}',
    handler: (request, reply) => {
      const filePath = path.resolve(__dirname, '../' + request.path.replace('/api/v1', 'static'));
      const fileBuffer = fs.readFileSync(filePath);
      reply(JSON.parse(fileBuffer));
    }
  },
  {
    method: 'GET',
    path: '/favicon.ico',
    handler: (request, reply) => {
      const filePath = path.resolve(__dirname, '../../assets/img/favicon.ico');
      reply(fs.readFileSync(filePath)).type('image/x-icon');
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
