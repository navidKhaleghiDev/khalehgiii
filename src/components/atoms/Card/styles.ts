import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const cardStyles = cva('', {
  variants: {
    color: {
      neutral: `${PALLET.BG_COLOR.NEUTRAL} `,
      teal: `${PALLET.BG_COLOR.TEAL} `,
      yellow: `${PALLET.BG_COLOR.YELLOW} `,
      red: `${PALLET.BG_COLOR.RED} `,
      white: `bg-white dark:bg-neutral-300`,
    },
    borderColor: {
      neutral: `${PALLET.BORDER_COLOR.NEUTRAL} `,
      teal: `${PALLET.BORDER_COLOR.TEAL} `,
      yellow: `${PALLET.BORDER_COLOR.YELLOW} `,
      red: `${PALLET.BORDER_COLOR.RED} `,
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    shadow: {
      sm: 'shadow-sm border border-neutral-100',
      md: 'shadow-md border border-neutral-100',
      lg: 'shadow-lg border border-neutral-100',
      xl: 'shadow-xl border border-neutral-100',
    },
    border: {
      true: 'border',
    },
  },
  defaultVariants: {
    color: 'white',
    rounded: 'md',
  },
});
