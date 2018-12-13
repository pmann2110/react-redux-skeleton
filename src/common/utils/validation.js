const isEmpty = (value) => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map((rule) => rule(value, data)).filter((error) => !!error)[0];

export function email(errorMsg) {
  return (value) => {
    // Let's not start a debate on email regex. This is just for an example app!
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return errorMsg || 'Invalid email address!';
    }

    return undefined;
  };
}

export function required(value, errorMsg) {
  if (isEmpty(value)) {
    return errorMsg || 'This field is required!';
  }

  return undefined;
}

export function isRequired(errorMsg) {
  return (value) => {
    if (isEmpty(value)) {
      return errorMsg || 'This field is required!';
    }

    return undefined;
  };
}

export function minLength(min, errorMsg) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return errorMsg || `Must be at least ${min} characters`;
    }

    return '';
  };
}

export function maxLength(max, errorMsg) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return errorMsg || `Must be no more than ${max} characters`;
    }

    return '';
  };
}

export function integer(value, errorMsg) {
  if (!Number.isInteger(Number(value))) {
    return errorMsg || 'Must be an integer';
  }

  return '';
}

export function match(field, errorMsg) {
  return (value, data) => {
    if (data && value !== data[field]) {
      return errorMsg || 'Do not match';
    }

    return '';
  };
}

export function notEqual(field1, field2, errorMsg) {
  if (field1 !== field2) {
    return errorMsg || 'Do not match';
  }

  return undefined;
}

export function same(field1, field2, errorMsg) {
  if (field1 === field2) {
    return errorMsg || 'Should not the same value';
  }

  return undefined;
}

export function strongPassword(errorMsg) {
  // tslint:disable-next-line:max-line-length
  const rex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)\`\~\_\-\+\=\{\}\[\]\|\\\:\;\"\'\,\<\.\>\?/])(?=.{8,})/;

  return (value) => {
    if (!isEmpty(value) && !rex.test(value)) {
      // tslint:disable-next-line:max-line-length
      return errorMsg || 'Your password must be at least 8 characters, contains at least one uppercase character, one lowercase character, one special character, and one number.';
    }

    return undefined;
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export default {
  createValidator,
  match,
  integer,
  maxLength,
  minLength,
  strongPassword,
  notEqual,
  same,
  required,
  email,
  isRequired
};
