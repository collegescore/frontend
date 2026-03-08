// Copied exactly from Python EmailService pattern. if changing logic here
export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
