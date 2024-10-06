import { cva } from 'class-variance-authority';

export const cardStyles = cva('', {
  variants: {
    color: {
      neutralLight: 'bg-gray-100 dark:bg-gray-300',
      neutral: 'bg-gray-200',
      teal: 'bg-teal-200 dark:bg-teal-300',
      yellow: 'bg-yellow-100 dark:bg-yellow-300',
      red: 'bg-red-400',
      white: `bg-white dark:bg-gray-600`,
      none: ``,
    },
    borderColor: {
      neutral: `border border-white hover:border-gray-300 active:border-gray-400 focus:border-gray-400 disabled:hover:bg-white dark:border-gray-600 dark:bg-gray-600 dark:hover:border-gray-500 dark:active:border-gray-300 dark:focus:border-gray-300`,
      teal: `border-2 border-white active:border-teal-400 focus:border-teal-400 disabled:hover:bg-white dark:border-teal-400 dark:bg-teal-400 dark:active:border-teal-400 dark:focus:border-teal-400`,
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      xxl: 'rounded-2xl',
    },
    shadow: {
      base: 'shadow',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    border: {
      true: 'border',
    },
  },
  defaultVariants: {
    color: 'none',
    rounded: 'md',
  },
});
