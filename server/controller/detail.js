/**
 * @file detail controller
 */

const handler = (request, reply) => {
  const data = {
    homeText: 'home',
    page1Text: 'page1',
    page2Text: 'page2'
  };
  let reactHtml = '';
  reply.render('detail/detail', {
    title: 'hapi detail',
    initData: JSON.stringify(data),
    reactHtml
  });
};

export default { handler };
