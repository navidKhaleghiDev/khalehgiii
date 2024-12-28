import { cva } from 'class-variance-authority';

export const baseIconStyles = cva('fill-current', {
  variants: {
    color: {
      neutral: 'text-gray-800 dark:text-white dark:hover:text-white',
      teal: 'text-teal-500 disabled:opacity-40 dark:text-teal-300 dark:hover:text-teal-300',
      yellow:
        'text-yellow-600 disabled:opacity-40 dark:text-yellow-500 dark:hover:text-yellow-500',
      red: 'text-red-600 disabled:opacity-40 dark:text-red-400 dark:hover:text-red-400',
      blue: 'text-blue-500 disabled:opacity-40 dark:text-blue-300 dark:hover:text-blue-300',
      purple:
        'text-purple-500 disabled:opacity-40 dark:text-purple-400 dark:hover:text-purple-400',
    },
    hoverColor: {
      primary: 'hover:text-teal-600',
      default: '',
    },
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-[2.375rem]',
      responsive: 'size-4 sm:size-6 md:size-[2.375rem]',
    },
  },
});
