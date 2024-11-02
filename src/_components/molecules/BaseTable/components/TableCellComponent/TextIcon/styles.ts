import { cva } from 'class-variance-authority';

export const TextIconStyle = cva(
  'flex justify-center items-center rounded gap-1 px-2 py-0.5',
  {
    variants: {
      color: {
        blue: 'bg-blue-100 text-blue-500 dark:bg-transparent dark:text-blue-300',
        purple:
          'bg-purple-100 text-purple-500 dark:bg-transparent dark:text-purple-400',
      },
    },
  }
);
