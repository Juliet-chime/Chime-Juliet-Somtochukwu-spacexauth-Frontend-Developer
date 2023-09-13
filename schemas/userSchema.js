const Joi = require('joi')

const registerSchema = Joi.object().keys({ 
    name: Joi.string().min(1).max(20).required().messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should have a minimum length of {#limit}`,
      'string.max': `"name" should have a max length of {#limit}`,
      'any.required': `"name" is a required field`
    }), 
    email:Joi.string().email().required().messages({
      'string.email': `"email" should be a type of 'email'`,
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
    }),
    password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/).required().messages({
      'string.pattern.base': `"Password" length should be max of 10 and contain atleast one capital letter, small letter, a number and a special character`,
      'string.empty': `"Password" cannot be an empty field`,
      'any.required': `"Password" is a required field`
    }), 
  });

  module.exports=registerSchema