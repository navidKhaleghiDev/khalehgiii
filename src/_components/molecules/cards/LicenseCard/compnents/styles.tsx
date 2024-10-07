import { cva } from 'class-variance-authority';

export const dateTitleStyle = cva(`before:w-px before:h-8 before:rounded-2xl`, {
  variants: {
    color: {
      blueLight: 'before:bg-blue-800',
      blue: 'before:bg-blue-400',
      red: 'before:bg-red-500 ',
      tealLight: 'before:bg-teal-400',
      teal: 'before:bg-teal-600',
      yellow: 'before:bg-yellow-500',
      purpleLight: 'before:bg-purple-100',
      purple: 'before:bg-purple-300',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});
