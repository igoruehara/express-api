exports.index = {
  tags: ['Users'],
  summary: 'Get all users in system',
  responses: {
    '200': {
      description: 'OK',
      schema: {
        $ref: '#/definitions/Users',
      },
    },
  },
};

exports.show = {
  tags: ['Users'],
  summary: 'Get user with given ID',
  responses: {
    '200': {
      description: 'User is found',
      schema: {
        $ref: '#/definitions/User',
      },
    },
  },
};

exports.store = {
  tags: ['Users'],
  description: 'Create new user in system',
  parameters: [
    {
      name: 'user',
      in: 'body',
      description: 'User that we want to create',
      schema: {
        $ref: '#/definitions/User',
      },
    },
  ],
  produces: ['application/json'],
  responses: {
    '200': {
      description: 'New user is created',
      schema: {
        $ref: '#/definitions/User',
      },
    },
  },
};

exports.destroy = {
  summary: 'Delete user with given ID',
  tags: ['Users'],
  responses: {
    '200': {
      description: 'User is deleted',
      schema: {
        $ref: '#/definitions/User',
      },
    },
  },
};

exports.update = {
  summary: 'Update user with give ID',
  tags: ['Users'],
  parameters: [
    {
      name: 'user',
      in: 'body',
      description: 'User with new values of properties',
      schema: {
        $ref: '#/definitions/User',
      },
    },
  ],
  responses: {
    '200': {
      description: 'User is updated',
      schema: {
        $ref: '#/definitions/User',
      },
    },
  },
};
