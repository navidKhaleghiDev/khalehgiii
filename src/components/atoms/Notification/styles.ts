import { cva } from 'class-variance-authority';

export const notificationStyles = cva('my-2 h-[3.75rem] px-5 py-3.5', {
  variants: {
    type: {
      success: 'bg-teal-500 text-white ',
      error: 'bg-red-400 text-white',
      default: 'bg-gray-500 text-white',
    },
    size: {
      sm: 'w-[25rem]',
      md: 'w-[50rem]',
      lg: 'w-[75rem]',
      fullWidth: 'w-full',
    },
  },
});
