const joi = require("@hapi/joi");

const data = joi.object({
  firstName: joi.string().min(3).max(30),
  lastName: joi.string().alphanum().min(2).max(30),
  emailId: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
});

module.exports = data