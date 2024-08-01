//as of right now there is no error in this. So please don't touch it unless very required.

const _ = require('lodash');
const yup = require('yup');
require('yup-password')(yup) 

function validateUser(user){

    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().password().min(8).minUppercase(1).minLowercase(1).minSymbols(1).minNumbers(1).required(),
        isAdmin: yup.boolean().required()
    });

    schema.validate(user)
        .then(result => {return result})
        .catch(err => {return err});

    return schema.validate(user);
}

module.exports = validateUser;