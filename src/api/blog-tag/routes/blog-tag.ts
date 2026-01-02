export default {
  routes: [
    {
      method: 'GET',
      path: '/blog-tags',
      handler: 'blog-tag.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/blog-tags/:id',
      handler: 'blog-tag.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
