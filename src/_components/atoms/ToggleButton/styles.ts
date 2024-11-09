import { cva } from 'class-variance-authority';

export const toggleStyles = cva('flex', {
  variants: {
    size: {
      sm: 'h-7 text-xs rounded-[0.25rem]',
      md: 'h-10 text-sm rounded-lg',
      responsive:
        'h-7 text-xs rounded-[0.25rem] sm:h-10 sm:text-sm sm:rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
