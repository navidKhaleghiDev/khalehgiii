export enum EPasswordStrengthColor {
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
): EPasswordStrengthColor | null {
  let score: null | EPasswordStrengthColor = null;
  if (password === '' || !password) {
    return score;
  }
  console.log({ password });

  console.log('teal', /^[a-zA-Z0-9@#$%^&*()].*$/.test(password));
  console.log(
    'yellow',
    /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[A-Z])).{6,64}$/.test(
      password
    )
  );
  console.log('red', /^(?=.*[a-zA-Z0-9]).{6,64}$/.test(password));

  switch (true) {
    case /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&_*\s]).{6,64}$/.test(
      password
    ):
      score = EPasswordStrengthColor.TEAL;
      break;
    case /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[0-9])|(?=.*[a-z])(?=.*[!@#$&_*\s])(?=.*[A-Z])).{6,64}$/.test(
      password
    ):
      score = EPasswordStrengthColor.YELLOW;
      break;
    case /^(?=.*[a-zA-Z0-9]).{6,64}$/.test(password):
      score = EPasswordStrengthColor.RED;
      break;
    default:
      score = null;
      break;
  }
  return score;
}

export function getLabelPasswordStrength(
  passwordStrength: EPasswordStrengthColor
) {
  switch (passwordStrength) {
    case EPasswordStrengthColor.RED:
      return 'ضعیف';

    case EPasswordStrengthColor.YELLOW:
      return 'متوسط';

    case EPasswordStrengthColor.TEAL:
      return 'قوی';

    default:
      return 'ضعیف';
  }
}
