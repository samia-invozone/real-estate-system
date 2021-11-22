const Joi = require("joi");

const validateSignIn = (usr) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(200).required(),
  });
  return schema.validate(usr);
};
const validateUserSchema = (usr) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    account_status: Joi.string().required(),
    verified_at: Joi.date().required(),
    role_id: Joi.number().required(),
  });
  return schema.validate(usr);
};
module.exports = { validateSignIn, validateUserSchema };
