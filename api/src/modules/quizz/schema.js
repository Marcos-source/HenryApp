const Joi = require('joi');

const schemaQuizz = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  idclase: Joi.number().required()
});

module.exports = schemaQuizz;
