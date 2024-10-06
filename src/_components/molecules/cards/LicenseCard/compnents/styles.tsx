import { cva } from 'class-variance-authority';

export const dateTitleStyle = cva(
  `relative after:absolute after:left-32 after:top-1 after:content-[''] after:block after:w-px after:h-8 after:rounded-2xl`,
  {
    variants: {
      color: {
        blueLight: 'after:bg-blue-800',
        blue: 'after:bg-blue-400',
        red: 'after:bg-red-500 ',
        tealLight: 'after:bg-teal-400',
        teal: 'after:bg-teal-600',
        yellow: 'after:bg-yellow-500',
        purpleLight: 'after:bg-purple-100',
        purple: 'after:bg-purple-300',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  }
);
