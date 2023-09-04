import { cva } from 'class-variance-authority';

export const headerStyles = cva(
  'flex justify-between items-center pb-3 p-2 h-12',
  {
    variants: {
      type: {
        error: 'bg-red-600',
        success: 'bg-teal-600 ',
        none: '',
      },
    },
  }
);

export const contentStyles = cva('modal-content text-center min-h-[12rem]', {
  variants: {
    type: {
      error: '',
      success: '',
      none: '',
    },
  },
});
