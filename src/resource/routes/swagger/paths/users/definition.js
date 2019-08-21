module.exports = {
  User: {
    required: ['email', '_id'],
    properties: {
      _id: {
        type: 'string',
        uniqueItems: true,
      },
      email: {
        type: 'string',
        uniqueItems: true,
      },
      lastName: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
    },
  },
  Users: {
    type: 'array',
    $ref: '#/definitions/User',
  },
};
