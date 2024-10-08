import { cva } from 'class-variance-authority';

export const baseInputNumberStyles = cva(
  ` min-h-10 peer border-gray-300 text-gray-400 hover:border-gray-400 focus:border-gray-900  focus:text-gray-900 flex text-sm rounded-lg outline-none border 
    h-10 dark:text-gray-500 dark:border-gray-400 dark:bg-gray-600 dark:hover:border-gray-300  dark:hover:text-gray-300 dark:focus:border-white dark:focus:text-white dark:disabled:!border-gray-500 `,
  {
    variants: {
      intent: {
        default: `bg-white border-gray-300 `,
        error: `bg-white border-red-600  dark:border-red-600 text-gray-900  active:border-red-600 hover:border-red-600 focus:border-red-600 `,
      },
      dir: {
        ltr: 'rounded-r-none pl-7',
        rtl: 'rounded-l-none pr-7',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: '!border-gray-200 active:border-gray-300 hover:border-gray-300 !text-gray-300 active:text-gray-300 opacity-40',
        false: '',
      },
      size: {
        sm: 'w-[120px]',
        md: 'w-[175px]',
        xl: 'w-[270px]',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);

export const iconBaseInputNumberButtonStyles = cva(
  'max-h-10 border border-gray-300 hover:bg-white hover:!border  active:bg-white active:border dark:border-gray-400',
  {
    variants: {
      intent: {
        default: 'text-gray-100',
      },
      rtl: {
        left: 'rounded-r-none',
        right:
          'rounded-r-none rounded-l-none border-l-0 border-r-0 hover:border-l-0 hover:border-r-0 active:border-l-0 active:border-r-0',
      },
      ltr: {
        left: 'rounded-l-none',
        right:
          'rounded-r-none rounded-l-none border-l-0 border-r-0 hover:border-l-0 hover:border-r-0 active:border-l-0 active:border-r-0',
      },
      disabled: {
        true: 'border-gray-200 !bg-white active:border-gray-300 hover:border-gray-300 !text-gray-300 active:text-gray-300 dark:!bg-gray-600 !opacity-40',
        // true: '!bg-white dark:!bg-gray-600 dark:!opacity-100 !border border-gray-300   dark:!border-gray-500 !opacity-40',
        false: '',
      },
      size: {
        sm: 'w-[20px]',
        md: 'w-[40px]',
        xl: 'w-[40px]',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'md',
    },
  }
);
export const BaseIconInputNumberStyles = cva('absolute top-3', {
  variants: {
    intent: {
      default:
        'text-gray-300 peer-hover:!text-gray-500 dark:peer-hover:!text-gray-300 peer-focus:!text-gray-900 dark:peer-focus:!text-white ',
      error: '!text-red-600 peer-hover:!text-red-600',
    },
    dir: {
      ltr: 'left-2',
      rtl: 'right-2',
    },
  },
});
