const Joi = require('joi');

class RequestMiddleware {
  static request(schema) {
    return (req, res, next) => {
      const { error } = Joi.validate(req.body, schema, { abortEarly: false });

      if (error !== null) return res.status(400).json(error);
      next();
    };
  }
}

module.exports = RequestMiddleware;
