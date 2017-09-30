/**
 * @file home controller
 */

const index = (request, reply) => reply.render('index', { title: 'hapi page', text: 'come index<br>' });
const home = (request, reply) => {
  request.yar.set('ts', { key: '123' });
  reply.render('detail', { title: 'hapi detail', data: request.payload });
};

export default {
  index,
  home
};
