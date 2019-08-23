module.exports = {
  tags: ['Sessions'],
  security: [],
  summary: 'Login',
  description: 'Login - Request to create a new token access.',
  produces: ['application/json'],
  schema: { $ref: '#/definitions/Auth' },
  parameters: [
    {
      name: 'Login',
      required: true,
      in: 'body',
      description: 'Parameters necessary to generate a access token',
      schema: {
        $ref: '#/definitions/Auth',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Success to create a token of access.',
    },
  },
  externalDocs: {
    description: 'Learn more about user operations provided by this API',
    url: 'http://api.example.com/docs/user-operations/',
  },
};
