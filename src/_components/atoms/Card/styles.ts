import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const cardStyles = cva('', {
  variants: {
    color: {
      neutralLight: `${PALLET.BG_COLOR.NEUTRAL_LIGHT} `,
      neutral: `${PALLET.BG_COLOR.NEUTRAL} `,
      teal: `${PALLET.BG_COLOR.TEAL} `,
      yellow: `${PALLET.BG_COLOR.YELLOW} `,
      red: `${PALLET.BG_COLOR.RED} `,
      white: `bg-white dark:bg-gray-300`,
    },
    borderColor: {
      neutralLight: `${PALLET.BORDER_COLOR.NEUTRAL_LIGHT} `,
      neutral: `${PALLET.BORDER_COLOR.NEUTRAL_LIGHT} `,
      teal: `${PALLET.BORDER_COLOR.TEAL} `,
      yellow: `${PALLET.BORDER_COLOR.YELLOW} `,
      red: `${PALLET.BORDER_COLOR.RED} `,
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-[20px]',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md border border-gray-200',
      lg: 'shadow-lg border border-gray-200',
      xl: 'shadow-xl border border-gray-200',
    },
    border: {
      true: 'border',
    },
  },
  defaultVariants: {
    color: 'white',
    rounded: 'md',
    borderColor: 'neutralLight',
  },
});
