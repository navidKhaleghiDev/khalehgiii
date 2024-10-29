import { t } from 'i18next';

export const regexPattern = {
  urlLink: {
    value:
      // eslint-disable-next-line no-useless-escape
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    message: t('regexPattern.value'),
  },
  onlyEnglishNdOtherCharacters: {
    value: /^(?!.*[\u0600-\u06E9\u200C])/,
    message: t('regexPattern.onlyEnglishNdOtherCharacters'),
  },
  lessThan50: {
    value: /^[0-9][0-9]?$|^50$/,
    message: t('regexPattern.lessThan50'),
  },
  lessThan100: {
    value: /^[0-9][0-9]?$|^100$/,
    message: t('regexPattern.lessThan100'),
  },
  lettersDashUnderLineSpace: {
    value: /^[a-zA-Z\-_]*$/i,
    message: t('regexPattern.lettersDashUnderLineSpace'),
  },
  lettersDashSpace: {
    value: /^[a-zA-Z-/]*$/i,
    message: t('regexPattern.lettersDashSpace'),
  },
  lettersEnglishSpace: {
    value: /^[a-zA-Z-_0-9]*$/i,
    message: t('regexPattern.lettersEnglishSpace'),
  },
  enCharAndNumber: {
    value: /^[A-Za-z0-9]*$/,
    message: t('regexPattern.enCharAndNumber'),
  },
  lettersDashUnderLineNumbers: {
    value: /^[A-Za-z0-9-_]*[A-Za-z0-9][A-Za-z0-9-_]*$/,
    message: t('regexPattern.lettersDashUnderLineNumbers'),
  },
  gitUrl: {
    value:
      // eslint-disable-next-line no-useless-escape
      /^(([A-Za-z0-9]+@|http(|s)\:\/\/)|(http(|s)\:\/\/[A-Za-z0-9]+@))([A-Za-z0-9.]+(:\d+)?)(?::|\/)([\d\/\w.-]+?)(\.git){1}$/i,
    message: t('regexPattern.gitUrl'),
  },
  smallLettersThenNumbers: {
    value: /^[a-z][a-z0-9-_ ]*$/gm,
    message: t('regexPattern.smallLettersThenNumbers'),
  },
  farsiLetters: {
    value: /[ا-ی]/gi,
    message: t('regexPattern.farsiLetters'),
  },
  accountNumber: {
    value: /[0-9-]{9,16}/,
    message: t('regexPattern.accountNumber'),
  },
  farsiLettersAndSpace: {
    value: /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\u200c\s]+$/,
    message: t('regexPattern.farsiLettersAndSpace'),
  },
  email: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: t('regexPattern.email'),
  },
  emailAndPhoneNumber: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[09|۰۹][0-9|۰۱۲۳۴۵۶۷۸۹]{10}$/,
    message: t('regexPattern.emailAndPhoneNumber'),
  },
  // ۰۱۲۳۴۵۶۷۸۹ mac persian number
  // ۰۱۲۳۴۵۶۷۸۹ windows persian number
  phoneNumber: {
    value: /^[09|۰۹][0-9|۰۱۲۳۴۵۶۷۸۹]{10}$/,
    message: t('regexPattern.phoneNumber'),
  },
  phoneNumber2: {
    value: /^09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}$/,
    message: t('regexPattern.phoneNumber2'),
  },
  phoneNumberNoZeroAtStart: {
    value: /^[9|۹][0-9|۰۱۲۳۴۵۶۷۸۹]{9}$/,
    message: t('regexPattern.phoneNumberNoZeroAtStart'),
  },
  englishLetter: {
    value: /^[a-zA-Z]+$/,
    message: t('regexPattern.englishLetter'),
  },
  farsiLetter: {
    value: /^[\u0600-\u06E9\u200C]+$/,
    message: t('regexPattern.farsiLetter'),
  },
  numbers: {
    value: /^[۰-۹٠-٩0-9]+$/,
    message: t('regexPattern.numbers'),
  },
  en_spc: {
    value: /^[a-zA-Z\s]+$/,
    message: t('regexPattern.en_spc'),
  },
  fa_spc: {
    value: /^[\u0600-\u06FF\s\u200C]+$/,
    message: t('regexPattern.fa_spc'),
  },
  lettersLenght3: {
    value: /[A-Za-z]{3}/,
    message: t('regexPattern.lettersLenght3'),
  },
  eightchar_number_lower_uppercase: {
    value:
      /(?=^.{8,64}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: t('regexPattern.eightchar_number_lower_uppercase'),
  },
  password: {
    value: /(?=^.{8,64}$)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: t('regexPattern.password'),
  },
  required: {
    value: true,
    message: t('regexPattern.required'),
  },
  jsonValidate: {
    value: /[^\0-9]/,
    message: t('regexPattern.jsonValidate'),
  },
  spaceFarstCharacter: {
    value: /^[^\s].*/,
    message: t('regexPattern.spaceFarstCharacter'),
  },
  cardNumber: {
    value: /^[۰-۹0-9--]+$/,
    message: t('regexPattern.cardNumber'),
  },
  shebaNumber: {
    value: /IR[۰-۹0-9]{24}/,
    message: t('regexPattern.shebaNumber'),
  },
  cardBankNumber: {
    value: /[۶۵65](?:[۰-۹0-9]{19}|[۰-۹0-9]{15})/,
    message: t('regexPattern.cardBankNumber'),
  },
  price: {
    value: /^[۰-۹٠-٩0-9-,]+$/,
    message: t('regexPattern.price'),
  },
};

export function enCharNumberUnderline(label?: string) {
  return {
    value: /^[a-zA-Z_0-9]*$/i,
    message: `${label || 'این فیلد'} تنها حروف لاتین،اعداد و _ را می پذیرد.`,
  };
}
