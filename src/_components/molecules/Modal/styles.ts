import { cva } from 'class-variance-authority';

export const headerStyles = cva('rounded-full p-2 dark:bg-gray-700', {
  variants: {
    type: {
      error: 'bg-red-100',
      success: 'bg-teal-100',
      info: 'bg-neutral-100',
      content: '',
      noneIcon: '',
    },
  },
});

export const containerStyles = cva('', {
  variants: {
    size: {
      sm: 'sm:w-[21.875rem] w-full',
      md: 'sm:w-[27.813rem] w-full',
      lg: 'w-[20.87rem] sm:w-[33.43rem] lg:w-[39.68rem]',
      responsive: 'sm:w-[27.813rem] w-[21.875rem]',
    },
  },
});
