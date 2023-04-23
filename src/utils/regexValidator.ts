const REGEX_EMAIL: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REGEX_PASSWORD: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,50}$/;
const REGEX_NAME: RegExp = /^[A-Z]{2,50}$/i;

/**
 *
 * \W mean [-+_!@#$%^&*.,?]
 * \d mean [0-9]
 *
 */

// TODO: complete validate service and create type.ts

// Link (condition): https://docs.google.com/spreadsheets/d/1-nNysbeuW7TwcETpD-qhaH2sUUq7HEduEp8e9Uw1Ndw/edit#gid=1848808472
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
