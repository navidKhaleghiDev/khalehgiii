import { cva } from 'class-variance-authority';

export const avatarStyles = cva(
  'relative flex justify-center items-center overflow-hidden rounded-full dark:bg-gray-500 bg-gray-100 border border-gray-300 dark:border-gray-400',
  {
    variants: {
      size: {
        sm: 'size-7',
        md: 'size-10',
        lg: 'size-16',
        responsive: 'size-7 md:size-10 lg:size-16',
        table: 'size-7 sm:size-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const iconAvatarStyles = cva('absolute text-gray-400', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-[2.375rem]',
      responsive: 'size-4 md:size-6 lg:size-[2.375rem]',
      table: 'size-4  sm:size-[2.375rem]',
    },
  },
});
