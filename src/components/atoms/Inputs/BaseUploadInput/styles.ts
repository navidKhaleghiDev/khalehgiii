import { SIZE } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const baseUploadInput = cva(
  `relative flex justify-center items-center w-14 h-14 overflow-hidden pointer cursor-pointer `,
  {
    variants: {
      size: {
        normal: SIZE.BUTTON.NORMAL,
        sm: SIZE.BUTTON.SMALL,
        md: SIZE.BUTTON.MEDIUM,
        lg: SIZE.BUTTON.LARGE,
        xl: SIZE.BUTTON.X_LARGE,
      },
    },
  }
);
export const baseUploadInputImage = cva(` w-12 h-12  rounded-full`);
