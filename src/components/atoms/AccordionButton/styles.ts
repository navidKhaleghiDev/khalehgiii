import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const titleStyles = cva(
  `flex items-center bg-neutral-100 h-10 my-4 w-full rounded-md`,
  {
    variants: {
      active: {
        true: `${PALLET.BG_COLOR.TEAL_DARK} ${PALLET.TEXT_COLOR.NEUTRAL_LIGHT}`,
        false: `${PALLET.TEXT_COLOR.NEUTRAL}`,
      },
    },
  }
);

export const contentStyles = cva(
  `flex w-full p-2 rounded-md border-2 ${PALLET.BG_COLOR.NEUTRAL} ${PALLET.BORDER_COLOR.TEAL} min-h-[8rem]`,
  {
    variants: {
      active: {
        true: ``,
      },
    },
  }
);
