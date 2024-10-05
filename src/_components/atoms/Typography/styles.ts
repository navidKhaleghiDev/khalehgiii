import { cva } from 'class-variance-authority';

export const typographyStyles = cva('', {
  variants: {
    color: {
      teal: 'text-teal-600 dark:text-white',
      neutralLight: 'text-gray-300 dark:text-gray-200',
      neutralMiddle: 'text-gray-400 dark:text-gray-300',
      neutral: 'text-gray-500 dark:text-gray-400',
      neutralDark: 'text-gray-600 dark:text-gray-200',
      red: 'text-red-600 dark:text-red-500',
      redDark: 'text-red-500 dark:text-red-400',
      white: 'text-white dark:text-gray-900',
      black: 'text-gray-900 dark:text-white',
    },
    variant: {
      h1: 'text-6xl',
      h2: 'text-5xl',
      h3: 'text-4xl',
      h4: 'text-3xl',
      body1: 'text-2xl',
      body1B: 'text-2xl font-medium',
      body2: 'text-xl',
      body2B: 'text-xl font-medium',
      body3: 'text-lg',
      body3B: 'text-lg font-medium',
      body4: 'text-base',
      body4B: 'text-base font-medium',
      body5: 'text-sm',
      body5B: 'text-sm font-medium',
      body6: 'text-sx',
      body6B: 'text-xs font-medium',
    },
  },
});
