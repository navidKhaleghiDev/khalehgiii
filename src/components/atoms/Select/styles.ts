import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const selectStyles = cva('', {
  variants: {
    color: {
      neutral: `${PALLET.BG_COLOR.NEUTRAL} `,
      teal: `${PALLET.BG_COLOR.TEAL} `,
      yellow: `${PALLET.BG_COLOR.YELLOW} `,
      red: `${PALLET.BG_COLOR.RED} `,
      white: `bg-white dark:bg-neutral-300`,
    },
  },
});
