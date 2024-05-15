import { SIZE } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const baseOtpStyles = cva(
  'px-2.5 py-2.5 flex block rounded-lg outline-none placeholder-opacity-50 focus:placeholder-opacity-0 text-center text-18  ',
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
      ltrPlaceHolder: {
        true: 'placeholder:text-left',
        false: 'placeholder:text-right placeholder:text-rtl',
      },
      size: {
        none: ``,
        xs: `w-[1rem] h-[1rem] py-1 ${SIZE.TYPOGRAPHY.BODY4}`,
        sm: `w-[2rem] h-[2rem] ${SIZE.TYPOGRAPHY.BODY3}`,
        md: `w-[2.5rem] h-[2.5rem] ${SIZE.TYPOGRAPHY.BODY3}`,
        lg: `w-[3rem] h-[3rem] ${SIZE.TYPOGRAPHY.BODY2}`,
        xl: `w-[4rem] h-[4rem] ${SIZE.TYPOGRAPHY.BODY2}`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'sm',
    },
  }
);
