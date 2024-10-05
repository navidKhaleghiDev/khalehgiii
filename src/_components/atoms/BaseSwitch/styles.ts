import { cva } from 'class-variance-authority';

export const baseSwitchStyles = cva(
  `relative h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-800 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white  after:rounded-full after:size-5 after:transition-all peer-checked:bg-teal-500 dark:peer-checked:bg-teal-400`,
  {
    variants: {
      size: {
        sm: 'w-10 peer-checked:after:translate-x-4 peer-checked:after:rtl:-translate-x-4',
        md: 'w-12 peer-checked:after:translate-x-6 peer-checked:after:rtl:-translate-x-6',
        responsive:
          'w-10 peer-checked:after:translate-x-4 peer-checked:after:rtl:-translate-x-4 sm:w-12 sm:peer-checked:after:translate-x-6 sm:peer-checked:after:rtl:-translate-x-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);
