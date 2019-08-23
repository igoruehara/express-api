module.exports = {
  User: {
    required: ['name', 'email', 'password', 'confirm_password'],
    properties: {
      id: {
        type: 'integer',
        uniqueItems: true,
      },
      name: {
        type: 'string',
        example: 'teste',
      },
      email: {
        type: 'string',
        example: 'teste@test.com.br',
        uniqueItems: true,
      },
      password: {
        type: 'string',
        example: 'abc@123456',
      },
      confirm_password: {
        type: 'string',
        example: 'abc@123456',
      },
      cpf: {
        type: 'string',
        example: '000.000.000-00',
      },
      cnpj: {
        type: 'string',
        example: '00.111.222/3333-44',
      },
      cep: {
        type: 'string',
        example: '11222-000',
      },
    },
  },
  Users: {
    type: 'array',
    $ref: '#/definitions/User',
  },
};
