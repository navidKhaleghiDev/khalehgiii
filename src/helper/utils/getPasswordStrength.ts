export enum PasswordStrengthColorParams {
  TEAL = 'teal',
  RED = 'red',
  YELLOW = 'yellow',
}

/*
   (?=.*[a-z]) must have at least one character as a-z
   return color name for css background
*/

export function getPasswordStrength(
  password?: string
): PasswordStrengthColorParams | null {
  let score: null | PasswordStrengthColorParams = null;
  if (password === '' || !password) {
    return score;
  }

  // console.log('teal', /^[a-zA-Z0-9@#$%^&*()].*$/.test(password));
  // console.log(
  //   'yellow',
  //   /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[A-Z])).{6,64}$/.test(
  //     password
  //   )
  // );
  // console.log('red', /^(?=.*[a-zA-Z0-9]).{6,64}$/.test(password));

  switch (true) {
    case /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&_*\s]).{6,64}$/.test(
      password
    ):
      score = PasswordStrengthColorParams.TEAL;
      break;
    case /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[A-Z])).{6,64}$/.test(
      password
    ):
      score = PasswordStrengthColorParams.YELLOW;
      break;
    case /^(?=.*[a-zA-Z0-9]).{6,64}$/.test(password):
      score = PasswordStrengthColorParams.RED;
      break;
    default:
      score = null;
      break;
  }
  return score;
}

export function getLabelPasswordStrength(
  passwordStrength: PasswordStrengthColorParams
) {
  switch (passwordStrength) {
    case PasswordStrengthColorParams.RED:
      return 'ضعیف';

    case PasswordStrengthColorParams.YELLOW:
      return 'متوسط';

    case PasswordStrengthColorParams.TEAL:
      return 'قوی';

    default:
      return 'ضعیف';
  }
}
