module.exports = {
  Auth: {
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        example: 'test@test.com.br',
      },
      password: {
        type: 'string',
        example: '123456',
      },
    },
  },
};
