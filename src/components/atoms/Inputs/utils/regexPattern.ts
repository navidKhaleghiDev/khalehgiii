export const regexPattern = {
  onlyEnglishNdOtherCharacters: {
    value: /^(?!.*[\u0600-\u06E9\u200C])/,
    message: 'لطفا فقط از حروف انگلیسی استفاده کنید',
  },
  uuid4: {
    value:
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi,
    message: 'فرمت صحیح uuid4  وارد کنید',
  },
  lettersDashUnderLineSpace: {
    value: /^[a-zA-Z\-_]*$/i,
    message: 'لطفاً فقط از حروف انگلیسی استفاده کنید(عدد مجاز نمی‌باشد)',
  },
  lettersDashSpace: {
    value: /^[a-zA-Z-/]*$/i,
    message: 'لطفاً فقط از حروف انگلیسی استفاده کنید(عدد مجاز نمی‌باشد)',
  },
  lettersEnglishSpace: {
    value: /^[a-zA-Z-_0-9]*$/i,
    message:
      'لطفاً فقط از حروف انگلیسی و اعداد استفاده کنید(کاراکتر های مجاز - و _)',
  },
  enCharAndNumber: {
    value: /^[A-Za-z0-9]*$/,
    message: 'فقط حروف انگلیسی و اعداد',
  },
  lettersDashUnderLineNumbers: {
    value: /^[A-Za-z0-9-_]*[A-Za-z0-9][A-Za-z0-9-_]*$/,
    message: 'فقط حروف انگلیسی و - و _ و اعداد',
  },
  farsiLetters: {
    value: /[ا-ی]/gi,
    message: 'نام و نام‌خانوادگی خود را به فارسی وارد کنید',
  },
  farsiLettersAndSpace: {
    value: /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\u200c\s]+$/,
    message: 'باید فارسی باشد',
  },
  email: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'فرمت ایمیل را به درستی و کامل وارد کنید',
  },
  emailAndPhoneNumber: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|[09|۰۹][0-9|۰۱۲۳۴۵۶۷۸۹]{10}$/,
    message: '',
  },
  // ۰۱۲۳۴۵۶۷۸۹ mac persian number
  // ۰۱۲۳۴۵۶۷۸۹ windows persian number
  phoneNumber: {
    value: /^[09|۰۹][0-9|۰۱۲۳۴۵۶۷۸۹]{10}$/,
    message: 'فرمت صحیح موبایل: 09xxxxx1234',
  },
  phoneNumber2: {
    value: /^09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}$/,
    message: 'فرمت صحیح موبایل: 09xxxxx1234',
  },
  phoneNumberNoZeroAtStart: {
    value: /^[9|۹][0-9|۰۱۲۳۴۵۶۷۸۹]{9}$/,
    message: 'فرمت صحیح موبایل: 9xxxxx1234',
  },
  englishLetter: {
    value: /^[a-zA-Z]+$/,
    message: 'لطفا فقط از حروف انگلیسی استفاده کنید',
  },
  farsiLetter: {
    value: /^[\u0600-\u06E9\u200C]+$/,
    message: 'لطفا فقط از حروف فارسی استفاده کنید',
  },
  numbers: {
    value: /^[۰-۹٠-٩0-9]+$/,
    message: 'لطفا فقط از اعداد استفاده کنید',
  },
  en_spc: {
    value: /^[a-zA-Z\s]+$/,
    message: 'لطفا فقط از حروف انگلیسی و فاصله استفاده کنید',
  },
  fa_spc: {
    value: /^[\u0600-\u06FF\s\u200C]+$/,
    message: 'لطفا فقط از حروف فارسی و فاصله استفاده کنید',
  },
  lettersLenght3: {
    value: /[A-Za-z]{3}/,
    message: 'checkpatern',
  },
  eightChar_number_lower_uppercase: {
    value:
      /(?=^.{8,64}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: 'باید حداقل 8 کاراکتر و حاوی حروف بزرگ و کوچک لاتین باشد.',
  },
  password: {
    value: /(?=^.{8,64}$)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: 'گذرواژه باید حداقل 8 کاراکتر و حاوی حروف بزرگ و کوچک لاتین باشد.',
  },
  required: {
    value: true,
    message: 'درج این فیلد ضروریست.',
  },
  spaceFarstCharacter: {
    value: /^[^\s].*/,
    message: 'فاصله مجاز نیست.',
  },
  cardNumber: {
    value: /^[۰-۹0-9--]+$/,
    message: 'فقط از اعداد استفاده کنید',
  },
  shebaNumber: {
    value: /IR[۰-۹0-9]{24}/,
    message: 'فقط از اعداد استفاده کنید',
  },
  cardBankNumber: {
    value: /[۶۵65](?:[۰-۹0-9]{19}|[۰-۹0-9]{15})/,
    message: 'فقط از اعداد استفاده کنید',
  },
  price: {
    value: /^[۰-۹٠-٩0-9-,]+$/,
    message: 'لطفا فقط از اعداد استفاده کنید',
  },
  ip: {
    value:
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
    message: 'لطفا فرمت صحیح آی پی را وارد نماپید',
  },
};

export function enCharNumberUnderline(label?: string) {
  return {
    value: /^[a-zA-Z_0-9]*$/i,
    message: `${label || 'این فیلد'} تنها حروف لاتین،اعداد و _ را می پذیرد.`,
  };
}
