import * as Validator from "email-validator";

const EmailValidator = value => {
  let valueToCheck = value;
  if (typeof value === "object") {
    valueToCheck = value.value;
  }

  if (!valueToCheck || Validator.validate(valueToCheck)) {
    return true;
  }
  return "Email Invalido";
};

export default EmailValidator;
