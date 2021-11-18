const Joi = require("joi");

const listUserById = Joi.object({
  id: Joi.number(),
});
module.exports = listUserById;
