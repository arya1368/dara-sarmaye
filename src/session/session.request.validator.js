const Joi = require('joi');

module.exports = function (credential) {
    const schema = {
        username: Joi.string().required().max(20),
        password: Joi.string().required().min(3).max(20)
    };

    return Joi.validate(credential, schema);
};
