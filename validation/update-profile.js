const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log(data.fname );
  data.fname = !isEmpty(data.fname) ? data.fname : '';
  data.nid = !isEmpty(data.nid) ? data.nid : '';

  if (!Validator.isLength(data.fname, { min: 2, max: 30 })) {
    errors.fname = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.fname)) {
    errors.fname = 'Name field is required';
  }
  if (Validator.isEmpty(data.nid)) {
    errors.nid = 'nid field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
