// logic copied from Backend email_service pattern. if changing logic here, also change there.

/* email: usernamename@address
 *      ^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+ allowed characters in username, prevents consecutive periods
 *      @ mandatory separator
 *      [A-Za-z0-9.-]+ domain name
 *      \.[A-Za-z]{2,7} extension like .com, .org, .uk
 */
export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,7}$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
