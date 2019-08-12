const Joi = require('joi');

class UserRequest {
  constructor() {
    this.schema = {
      store: Joi.object().keys({
        name: Joi.string()
          .min(3)
          .max(150)
          .required()
          .error(err => ({ message: 'O campo nome está inválido.' }))
          .label('Nome'),
        email: Joi.string()
          .email()
          .label('E-mail'),
        password: Joi.string()
          .regex(/^[a-zA-Z0-9]{3,30}$/)
          .label('Senha'),
        password_confirm: Joi.string()
          .required()
          .valid(Joi.ref('password'))
          .options({
            language: {
              any: {
                allowOnly: 'Passwords do not match',
              },
            },
          }),
      }),
    };
  }
}

module.exports = {
  post: new UserRequest().schema.store,
};
