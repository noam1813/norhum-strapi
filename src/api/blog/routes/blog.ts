export default {
  routes: [
    {
      method: 'GET',
      path: '/blogs',
      handler: 'blog.find',
      config: {
        auth: {
          scope: ['find'],
        },
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/blogs/:id',
      handler: 'blog.findOne',
      config: {
        auth: {
          scope: ['findOne'],
        },
        policies: [],
        middlewares: [],
      },
    },
  ],
};
