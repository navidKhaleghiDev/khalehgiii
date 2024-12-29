import { cva } from 'class-variance-authority';

export const toggleStyles = cva(
  'flex bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 py-1',
  {
    variants: {
      size: {
        sm: 'h-7 text-xs rounded-[0.25rem]',
        md: 'h-10 text-sm rounded-lg',
        responsive:
          'h-7 text-xs rounded-[0.25rem] sm:h-10 sm:text-sm sm:rounded-lg',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const buttonStyle = cva(
  'flex items-center justify-center cursor-pointer rounded-[0.25rem] text-center w-16 mx-1 text-gray-400',
  {
    variants: {
      disabled: {
        true: 'cursor-auto',
        false: '',
      },
      active: {
        true: 'text-gray-900  bg-white dark:text-white dark:bg-gray-600 outline-none',
        false: '',
      },
    },
  }
);
