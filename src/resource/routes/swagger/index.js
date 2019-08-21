const swaggerConfig = require('../../../config/swagger');
const tags = require('./tags');

const { Users, User } = require('./paths/users/definition');
const users = require('./paths/users/resource');

module.exports = {
  ...swaggerConfig,
  tags,
  paths: {
    '/users': {
      get: users.index,
      post: users.store,
    },
    '/users/{userId}': {
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'ID of user that we want to find',
          type: 'string',
        },
      ],
      get: users.show,
      delete: users.destroy,
      put: users.update,
    },
  },
  definitions: {
    Users,
    User,
  },
};
