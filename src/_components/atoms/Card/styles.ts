import { cva } from 'class-variance-authority';

export const cardStyles = cva('', {
  variants: {
    color: {
      neutralLight: 'bg-gray-100 dark:bg-gray-300',
      neutral: 'bg-gray-200',
      teal: 'bg-teal-200 dark:bg-teal-300',
      yellow: 'bg-yellow-100 dark:bg-yellow-300',
      red: 'bg-red-400',
      white: `bg-white dark:bg-gray-300`,
    },
    borderColor: {
      neutralLight: 'border-gray-200',
      neutral:
        'border-gray-300 hover:border-gray-400 active:border-gray-900 disabled:border-gray-300 dark:border-gray-400 dark:hover:border-white dark:disabled:border-gray-500',
      teal: 'border-teal-500 dark:border-teal-500',
      yellow: 'border-yellow-600 dark:border-yellow-600',
      red: 'border-red-600 dark:border-red-500',
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-[20px]',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md border border-gray-200',
      lg: 'shadow-lg border border-gray-200',
      xl: 'shadow-xl border border-gray-200',
    },
    border: {
      true: 'border',
    },
  },
  defaultVariants: {
    color: 'white',
    rounded: 'md',
    borderColor: 'neutralLight',
  },
});
