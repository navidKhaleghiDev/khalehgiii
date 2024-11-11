import { cva } from 'class-variance-authority';

export const baseTextareaStyles = cva(
  'peer p-2 flex bg-white dark:bg-gray-700 text-sm text-gray-900 dark:border-gray-400 dark:focus:placeholder-white border-gray-300 hover:border-gray-500 dark:hover:placeholder-gray-300 dark:hover:border-gray-300 hover:placeholder-gray-500 focus:border-gray-900 focus:placeholder-gray-900 rounded-lg outline-none border min-h-[4.375rem] disabled:bg-white disabled:border-gray-300 dark:text-white disabled:placeholder-gray-300 disabled:opacity-50 dark:placeholder-gray-500 dark:bg-transparent dark:disabled:border-gray-500 dark:disabled:placeholder-gray-500',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
      },
      error: {
        true: 'border-red-600 hover:border-red-500 focus:border-red-500 placeholder-gray-900 dark:text-white dark:placeholder-white dark:focus:border-red-500  dark:hover:border-red-500 dark:border-red-500',
        false: 'dark:focus:border-white',
      },
      size: {
        sm: `w-40`,
        md: `w-[15.94rem]`,
        lg: `w-[21.88rem]`,
      },
    },

    defaultVariants: {
      size: 'md',
    },
  }
);

export const baseInputTextAreaStyles = cva(
  `px-1 text-gray-400 dark:text-white`,
  {
    variants: {
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'dark:peer-disabled:text-gray-500 peer-disabled:text-gray-300',
        false: 'peer-hover:text-gray-500 dark:peer-hover:text-white',
      },
      size: {
        sm: `w-40`,
        md: `w-[15.94rem]`,
        lg: `w-[21.88rem]`,
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
);
