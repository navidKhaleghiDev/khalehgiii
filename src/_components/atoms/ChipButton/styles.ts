import { cva } from 'class-variance-authority';

export const chipButtonStyles = cva(
  'truncate flex max-w-max items-center py-4 px-2 w-full max-h-5 rounded-md disabled:opacity-40 gap-2 ',
  {
    variants: {
      color: {
        neutral:
          'bg-gray-100 text-gray-800 disabled:opacity-40 dark:bg-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-white',
        teal: 'bg-teal-100 text-teal-500 disabled:opacity-40 dark:bg-gray-600 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-gray-800 dark:hover:text-teal-300 ',
        yellow:
          'bg-yellow-100 text-yellow-600 disabled:opacity-40  dark:bg-gray-600 dark:text-yellow-500 hover:bg-yellow-200 dark:hover:bg-gray-800 dark:hover:text-yellow-500',
        red: 'bg-red-100 text-red-600 disabled:opacity-40 dark:bg-gray-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-gray-800 dark:hover:text-red-400',
        blue: 'bg-blue-100 text-blue-500 disabled:opacity-40  dark:bg-gray-600 dark:text-blue-300  hover:bg-blue-200 dark:hover:bg-gray-800 dark:hover:text-blue-300 ',
        purple:
          'bg-purple-100 text-purple-500 disabled:opacity-40 dark:bg-gray-600 dark:text-purple-400  hover:bg-purple-300 dark:hover:bg-gray-800 dark:hover:text-purple-400 ',
      },
    },
    defaultVariants: {
      color: 'neutral',
    },
  }
);
