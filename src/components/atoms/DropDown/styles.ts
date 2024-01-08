import { SIZE } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const baseDropDownStyles = cva(
  'flex justify-between items-center rounded-lg px-2',
  {
    variants: {
      intent: {
        default:
          'bg-neutral-100 text-neutral-500 border border-2 border-neutral-500 focus:border-teal-600 focus:text-teal-500 focus:placeholder-teal-500 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-400 disabled:shadow-none',
        error:
          'text-red-600 border border-2 border-red-600 placeholder-red-400',
      },
      fullWidth: {
        true: 'w-full',
      },
      selected: {
        true: 'text-teal-600',
      },
      size: {
        xs: `w-52 h-6 py-1 ${SIZE.TYPOGRAPHY.BODY4}`,
        sm: `w-[18.75rem] h-10 text-md${SIZE.TYPOGRAPHY.BODY3}`,
        md: `w-[27.5rem] h-10 text-lg ${SIZE.TYPOGRAPHY.BODY3}`,
        lg: `w-[60rem] h-10 text-xl ${SIZE.TYPOGRAPHY.BODY2}`,
        xl: `w-[60rem] h-16 text-xl ${SIZE.TYPOGRAPHY.BODY2}`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'sm',
    },
  }
);

export const optionSelectStyles = cva(
  'absolute block bg-neutral-100 rounded text-right mt-2 border-2 border-teal-500 max-h-28 overflow-y-auto z-10',
  {
    variants: {
      isShow: {
        false: 'hidden',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        xs: `w-52 ${SIZE.TYPOGRAPHY.BODY4}`,
        sm: `w-[18.75rem] text-md${SIZE.TYPOGRAPHY.BODY3}`,
        md: `w-[27.5rem] text-lg ${SIZE.TYPOGRAPHY.BODY3}`,
        lg: `w-[60rem] text-xl ${SIZE.TYPOGRAPHY.BODY2}`,
        xl: `w-[60rem] text-xl ${SIZE.TYPOGRAPHY.BODY2}`,
      },
    },
    defaultVariants: {
      isShow: false,
      size: 'sm',
    },
  }
);
