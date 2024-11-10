import { cva } from 'class-variance-authority';

export const TagHelperCellStyles = cva(
  'flex justify-center items-center rounded gap-1 px-2 py-0.5 md:dark:bg-gray-800 dark:bg-gray-600',
  {
    variants: {
      color: {
        yellow: 'bg-yellow-100 text-yellow-600 dark:text-yellow-400',
        teal: 'bg-teal-100 text-teal-500 dark:text-teal-400',
        red: 'bg-red-100 text-red-600 dark:text-red-400',
        blue: 'bg-blue-100 text-blue-500 dark:text-blue-300',
        purple: 'bg-purple-100 text-purple-500 dark:text-purple-400',
      },
    },
  }
);
