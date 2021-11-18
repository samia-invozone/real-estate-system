const Joi = require("joi");
const { errorResponse } = require("../helpers/responseHelper");

//* Include joi to check error type
//* Include all validators
const Validators = require("../validators");

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi)
        // return next(createHttpError(422, { message: err.message }));
        return next(errorResponse(req, res, err.message, 422));
      next(errorResponse(500));
    }
  };
};
