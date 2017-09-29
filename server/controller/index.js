/**
 * @file home controller
 */

const index = (request, reply) => reply.render('index', { title: 'hapi page', text: 'come index<br>' });
const home = (request, reply) => reply('come home');

export default {
  index,
  home,
};
