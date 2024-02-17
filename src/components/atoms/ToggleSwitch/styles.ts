import { cva } from 'class-variance-authority';

export const avatarStyles = cva(
  'relative flex justify-center items-center overflow-hidden rounded-full dark:bg-gray-600',
  {
    variants: {
      intent: {
        primary: 'bg-teal-600 border-none',
        grey: 'bg-neutral-100 border',
        inactive: 'bg-neutral-200 border-none',
      },
      size: {
        sm: 'w-8 h-8 border-1',
        md: 'w-20 h-20 border-2',
        lg: 'w-48 h-48 border-4',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
);

export const iconAvatarStyles = cva('absolute dark:text-white ', {
  variants: {
    intent: {
      primary: 'text-white ',
      grey: 'text-teal-600 ',
      inactive: 'text-neutral-400 ',
    },
    size: {
      sm: 'w-6 h-6 ',
      md: 'w-16 h-16 ',
      lg: 'w-36 h-36',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});
