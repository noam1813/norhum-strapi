export default {
  routes: [
    {
      method: 'GET',
      path: '/works',
      handler: 'work.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/works/:id',
      handler: 'work.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
