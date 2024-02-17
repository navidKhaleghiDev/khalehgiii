import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const titleStyles = cva(
  `flex items-center min-h-10 my-2 w-full rounded-md`,
  {
    variants: {},
  }
);

export const contentStyles = cva(
  `flex w-full p-2 rounded-md  ${PALLET.BG_COLOR.NEUTRAL}  min-h-[8rem]`,
  {
    variants: {},
  }
);
