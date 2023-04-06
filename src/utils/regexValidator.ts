const REGEX_EMAIL: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REGEX_PASSWORD: RegExp =
  /(?=.+\d)(?=.+[a-z])(?=.+[A-Z])(?=.*\W){8,50}^[^ ]+$/;
const REGEX_NAME: RegExp = /^[A-Z]{2,50}$/i;

/**
 *
 * \W mean [-+_!@#$%^&*.,?]
 * \d mean [0-9]
 *
 */

// TODO: complete validate service and create type.ts

const regexValidator = {
  email(email: string): boolean {
    return REGEX_EMAIL.test(email);
  },
  password(password: string): boolean {
    return REGEX_PASSWORD.test(password);
  },
  name(name: string): boolean {
    return REGEX_NAME.test(name);
  },
};

export { regexValidator };

/**
 *
 * const isCorrect:boolean = regexValidator.email("......")
 *
 */
