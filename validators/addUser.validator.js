const Joi = require("joi");
const joiPassword = require("joi-password");

const addUser = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  account_status: Joi.string().required(),
  verified_at: Joi.date().required(),
  role_id: Joi.number().required(),
});
module.exports = addUser;
