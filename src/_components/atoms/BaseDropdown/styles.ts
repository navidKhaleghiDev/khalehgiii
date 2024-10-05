import { cva } from 'class-variance-authority';

export const baseDropDownStyles = cva(
  'flex justify-between items-center px-2',
  {
    variants: {
      intent: {
        default: `h-10 text-sm bg-white rounded-lg border border-gray-300 text-gray-300 hover:border-gray-400 hover:text-gray-400 active:border-gray-900 active:text-gray-900  
        dark:bg-gray-700 dark:text-gray-500 dark:border-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:active:bg-gray-700 dark:active:text-white
        cursor-pointer `,
        error:
          'bg-white !text-red-600 border border-red-600 text-base h-10 rounded-lg cursor-pointer dark:bg-gray-700 dark:text-red-600 dark:border-red-600 ',
      },
      disabled: {
        true: 'bg-white text-gray-300 border-gray-300 opacity-40 !cursor-default hover:text-gray-300 hover:bg-white hover:border-gray-300 active:bg-white active:text-gray-300 active:border-gray-300 ',
        false: '',
      },
      size: {
        sm: 'w-[160px]',
        md: 'w-[255px]',
        xl: 'w-[350px]',
      },
      fullWidth: {
        true: '!w-full',
      },
      selected: {
        true: 'text-gray-900 border-gray-900 dark:text-white text-sm ',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);

export const optionSelectStyles = cva(
  `absolute max-h-24 text-lg  text-sm block bg-white rounded-lg  text-gray-400  shadow-sm text-left mt-[7px] border overflow-y-auto z-10 dark:bg-gray-600 dark:text-gray-500 dark:border-gray-400 dark:active:text-white dark:active:bg-gray-500 `,
  {
    variants: {
      isShow: {
        false: 'hidden',
      },
      size: {
        sm: 'w-[160px]',
        md: 'w-[255px]',
        xl: 'w-[352px]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      isShow: false,
      size: 'md',
    },
  }
);
