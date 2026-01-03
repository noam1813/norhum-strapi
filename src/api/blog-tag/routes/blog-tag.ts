export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-tags',
      handler: 'blog-tag.find',
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
      path: '/blog-tags/:id',
      handler: 'blog-tag.findOne',
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
