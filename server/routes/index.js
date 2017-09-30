/**
 * @file home router
 * @author windwithfo
 */
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
