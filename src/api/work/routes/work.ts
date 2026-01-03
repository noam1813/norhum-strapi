export default {
  routes: [
    {
      method: 'GET',
      path: '/works',
      handler: 'work.find',
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
      path: '/works/:id',
      handler: 'work.findOne',
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
