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
