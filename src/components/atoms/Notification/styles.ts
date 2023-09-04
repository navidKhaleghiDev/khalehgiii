import { cva } from 'class-variance-authority';

export const notificationStyles = cva('my-2 h-[3.75rem] pr-5 py-3.5', {
  variants: {
    type: {
      success: 'bg-teal-100 text-teal-600 ',
      error: 'bg-red-200 text-red-600',
    },
    outline: {
      success: 'bg-white text-teal-600 border-teal-600',
      error: 'bg-white text-red-600 border-red-600',
    },
    size: {
      sm: 'w-[25rem]',
      md: 'w-[50rem]',
      lg: 'w-[75rem]',
      fullWidth: 'w-full',
    },
  },
});
