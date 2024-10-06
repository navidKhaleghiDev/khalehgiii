import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const cardStyles = cva('', {
  variants: {
    color: {
      neutral: `${PALLET.BG_COLOR.NEUTRAL} `,
      teal: `${PALLET.BG_COLOR.TEAL} `,
      tealDark: `${PALLET.BG_COLOR.TEAL_DARK} `,
      yellow: `${PALLET.BG_COLOR.YELLOW} `,
      red: `${PALLET.BG_COLOR.RED} `,
      white: `bg-white dark:bg-gray-600`,
      none: ``,
    },
    borderColor: {
      neutral: `border border-white hover:border-gray-300 active:border-gray-400 focus:border-gray-400 disabled:hover:bg-white dark:border-gray-600 dark:bg-gray-600 dark:hover:border-gray-500 dark:active:border-gray-300 dark:focus:border-gray-300`,
      teal: `border-2 border-white active:border-teal-400 focus:border-teal-400 disabled:hover:bg-white dark:border-teal-400 dark:bg-teal-400 dark:active:border-teal-400 dark:focus:border-teal-400`,
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      xxl: 'rounded-2xl',
    },
    shadow: {
      base: 'shadow',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    border: {
      true: 'border',
    },
  },
  defaultVariants: {
    color: 'none',
    rounded: 'md',
  },
});
