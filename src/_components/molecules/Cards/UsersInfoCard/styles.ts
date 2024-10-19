import { cva } from 'class-variance-authority';

export const iconStyles = cva('p-2 rounded-lg dark:bg-gray-700', {
  variants: {
    iconColor: {
      blue: 'text-blue-500 bg-blue-100 dark:text-blue-300',
      teal: 'text-teal-500 bg-teal-100 dark:text-teal-300',
      yellow: 'text-yellow-600 bg-yellow-100 dark:text-yellow-300',
      neutral: 'text-gray-500 bg-gray-100 dark:text-gray-300',
    },
  },
  defaultVariants: {
    iconColor: 'teal',
  },
});
