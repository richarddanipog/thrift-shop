//named export
//you'll import with {}
export const field = ({
  name,
  value = "",
  isRequired = false,
  minLength = 0,
  maxLength = 0,
  pattern = "",
  include = [],
}) => {
  const settings = {
    name,
    value,
    errors: [],
    validations: {},
  };

  if (isRequired) {
    settings.validations.required = true;
  }
  if (minLength) {
    settings.validations.minLength = minLength;
  }
  if (maxLength) {
    settings.validations.maxLength = maxLength;
  }
  if (pattern) {
    settings.validations.pattern = pattern;
  }
  if (include.length) {
    settings.validations.include = include;
  }

  return settings;
};

//The default export
//You'll import as usual
export default (name, value, validations) => {
  const errors = [];
  //required validation
  if (validations.required && required(value)) {
    // const errors = [`${name} is required`];
    errors.push(`${name} is required`);
  }

  if (validations.minLength && minLength(value, validations.minLength)) {
    if (name !== "images") {
      errors.push(
        `${name} should be no less than ${validations.minLength} characters`
      );
    } else {
      errors.push(
        `${name} should be no less than ${validations.minLength} images`
      );
    }
  }
  if (validations.maxLength && maxLength(value, validations.maxLength)) {
    errors.push(
      `${name} should be no more than ${validations.maxLength} images`
    );
  }

  if (validations.pattern && pattern(value, validations.pattern)) {
    errors.push(`${name} invalid`);
  }
  if (validations.include && !includeIn(value, validations.include)) {
    errors.push(`${name} invalid need to be one off (indoor,outdoor,decor)`);
  }

  return errors;
};

const required = (value) => !value;

const minLength = (value, min) => value.length < min;

const maxLength = (value, max) => value.length > max;

const pattern = (value, pattern) => !pattern.test(value);

const includeIn = (value, enumList) => enumList.find((e) => e === value);
