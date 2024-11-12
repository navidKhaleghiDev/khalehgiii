import { cva } from 'class-variance-authority';

export const baseInputStyles = cva(
  `peer p-2 flex text-sm dark:bg-slate-700 bg-white text-gray-900 dark:border-gray-400 border-gray-300 hover:border-gray-500 dark:hover:border-gray-300 focus:border-gray-900 rounded-lg outline-none rtl:placeholder:text-right ltr:placeholder:text-left border h-10 disabled:bg-white disabled:border-gray-300 dark:text-white disabled:placeholder-gray-300 disabled:opacity-50 dark:placeholder-gray-500 dark:bg-transparent dark:disabled:border-gray-500 dark:disabled:placeholder-gray-500`,
  {
    variants: {
      intent: {
        default: ``,
      },
      error: {
        true: 'border-red-600 hover:border-red-500 focus:border-red-500 dark:text-white dark:focus:border-red-500  dark:hover:border-red-500 dark:border-red-500',
        false: 'dark:focus:border-white',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        sm: `w-40`,
        md: `w-[15.94rem]`,
        lg: `w-[21.88rem]`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);
export const baseInputTextStyles = cva(
  `px-1 mt-[0.13rem] text-gray-400 dark:text-white`,
  {
    variants: {
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'dark:peer-has-[:disabled]:text-gray-500 peer-has-[:disabled]:text-gray-300',
        false:
          'peer-has-[:hover]:text-gray-500 dark:peer-has-[:hover]:text-white',
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
export const baseInputWarperStyles = cva(``, {
  variants: {
    fullWidth: {
      true: 'w-full',
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
});
