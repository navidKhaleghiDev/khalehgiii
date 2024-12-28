import { cva } from 'class-variance-authority';

export const badgeStyles = cva(
  `absolute z-10 flex justify-center items-center rounded-full text-xs leading-3 text-white px-1`,
  {
    variants: {
      size: {
        sm: 'size-2 -top-0.5 -right-0.5',
        md: 'size-5 -top-2 -right-2',
        default: '',
      },
    },
  }
);
