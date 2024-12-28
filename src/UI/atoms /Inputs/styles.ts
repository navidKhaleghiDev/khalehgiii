import { cva } from 'class-variance-authority';
import { SIZE } from '@src/constants/theme';

// Remember that this cva has been used in different modules and can not be in specific module
// The color of the icon is better to be text-gray-700 when we are using it in the darkMode.

export const baseCheckBoxStyles = cva(
  `before:content[''] peer relative cursor-pointer appearance-none border rounded transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-teal-400 before:opacity-0 before:transition-opacity checked:border-teal-500 checked:bg-teal-500 checked:before:bg-teal-500`,
  {
    variants: {
      intent: {
        default:
          'border-gray-200 bg-gray-100 dark:border-gray-400 dark:bg-gray-500',
        error: '',
      },
      size: {
        sm: `size-4`,
        md: `size-6`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);

export const iconBaseInputStyles = cva(
  'absolute inset-y-0 flex px-2 items-center active:text-gray-500 fill-current',
  {
    variants: {
      intent: {
        default: 'text-gray-300 peer-focus:text-gray-500',
        error: 'text-red-500 peer-focus:border-red-500',
      },
      right: {
        true: 'right-0',
        false: 'left-0',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
);

export const baseSelectStyles = cva(
  `px-2 py-1.5 appearance-none flex rounded-lg outline-none bg-white placeholder:text-right border-gray-300 placeholder:text-rtl relative`,
  {
    variants: {
      intent: {
        default: `text-gray-900 focus:border-teal-500 border shadow-sm focus:border-2 focus:placeholder-gray-900 focus:text-gray-900 disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-500 disabled:shadow-none`,
        primary:
          'bg-white w-fit disabled:text-gray-300 rounded-md text-xs text-gray-600 cursor-pointer',
        error: `text-gray-900 border-2 placeholder-gray-900`,
      },
      fullWidth: {
        true: 'w-full',
      },
      ltrPlaceHolder: {
        true: 'placeholder:text-left',
        false: 'placeholder:text-right placeholder:text-rtl',
      },
      size: {
        none: ``,
        xs: `w-52 h-6 py-1 ${SIZE.TYPOGRAPHY.BODY4}`,
        sm: `w-40 h-10 text-md ${SIZE.TYPOGRAPHY.BODY3}`,
        md: `w-[13.75rem] h-10 ${SIZE.TYPOGRAPHY.BODY4}`,
        lg: `w-64 h-10 ${SIZE.TYPOGRAPHY.BODY4}`,
        xl: '',
        freeWidth: `w-full h-10 text-md ${SIZE.TYPOGRAPHY.BODY3}`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);

export const baseOtpStyles = cva(
  'block rounded-lg text-gray-400 outline-none text-center text-base',
  {
    variants: {
      intent: {
        default:
          'border text-gray-300 border-gray-500 focus:border-gray-500 focus:text-gray-500 focus:placeholder-gray-500 disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-300 disabled:shadow-none',
        error: 'text-gray-900 border border-red-600 placeholder-red-400',
      },
      fullWidth: {
        true: 'w-full',
      },
      ltrPlaceHolder: {
        true: 'placeholder:text-left',
        false: 'placeholder:text-right placeholder:text-rtl',
      },
      size: {
        none: ``,
        xs: ``,
        sm: ``,
        md: `size-10 ${SIZE.TYPOGRAPHY.BODY3}`,
        lg: `size-14 ${SIZE.TYPOGRAPHY.BODY2}`,
        xl: ``,
      },
    },
    defaultVariants: {
      intent: 'error',
      size: 'md',
    },
  }
);

export const baseInputStyles = cva(
  `peer p-2 flex text-sm rounded-lg outline-none border h-10 disabled:bg-white disabled:border-gray-300 dark:text-white disabled:placeholder-gray-300 disabled:opacity-50 dark:border-gray-400 dark:placeholder-gray-500 dark:bg-transparent dark:disabled:border-gray-500 dark:disabled:placeholder-gray-500`,
  {
    variants: {
      intent: {
        default: `text-gray-900 dark:focus:border-white dark:border-gray-400 dark:focus:placeholder-white border-gray-300 hover:border-gray-500 dark:hover:placeholder-gray-300 dark:hover:border-gray-300 hover:placeholder-gray-500 focus:border-gray-900 focus:placeholder-gray-900`,
        error: `border-red-600 dark:text-white dark:placeholder-white placeholder-gray-900 dark:focus:border-red-500 dark:border-red-500 `,
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        sm: `w-40`,
        md: `w-[15.94rem]`,
        lg: `w-[21.88rem]`,
        freeWidth: `w-full h-10 text-md`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);
