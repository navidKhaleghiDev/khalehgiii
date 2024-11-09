import { cva } from 'class-variance-authority';

export const baseOtpStyles = cva(
  'block rounded-lg outline-none text-center bg-white dark:bg-gray-700 dark:disabled:border-gray-500 dark:disabled:text-gray-500 dark:text-gray-500 dark:border-gray-400 disabled:text-gray-300 disabled:border-gray-300 text-base',
  {
    variants: {
      intent: {
        default:
          'border text-gray-300 dark:text-neutral-500 dark:hover:border-gray-300 dark:focus:text-white dark:focus:border-white dark:hover:text-gray-300 border-gray-400 hover:text-gray-500 hover:border-gray-500 focus:border-gray-900 focus:text-gray-900 focus:placeholder-gray-500',
        error:
          'text-gray-900 border border-red-600 dark:border-red-500 dark:text-white',
      },
      size: {
        sm: 'size-10',
        md: 'size-14',
        responsive: 'size-10 sm:size-14',
      },
    },
    defaultVariants: {
      intent: 'default',
    },
  }
);

export const otpTextStyles = cva('text-center', {
  variants: {
    intent: {
      default: 'dark:text-white',
      disabled: 'text-gray-300 dark:text-gray-500',
    },
    size: {
      sm: 'w-[15.625rem]',
      md: 'w-[21.875rem]',
      responsive: 'w-[15.625rem] sm:w-[21.875rem]',
    },
  },
  defaultVariants: {
    intent: 'default',
  },
});
