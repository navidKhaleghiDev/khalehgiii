import { cva } from 'class-variance-authority';

export const dateTitleStyle = cva(`before:w-px before:h-8 before:rounded-2xl`, {
  variants: {
    color: {
      blueLight: 'before:bg-blue-400 dark:before:bg-blue-200',
      blue: 'before:bg-blue-800 dark:before:bg-blue-400',
      red: 'before:bg-red-500 dark:before:bg-red-300',
      tealLight: 'before:bg-teal-400 dark:before:bg-teal-200',
      tealDark: 'before:bg-teal-600 dark:before:bg-teal-400',
      yellow: 'before:bg-yellow-500 dark:before:bg-yellow-400',
      purpleLight: 'before:bg-purple-300 dark:before:bg-purple-200',
      purple: 'before:bg-purple-500 dark:before:bg-purple-400',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});
