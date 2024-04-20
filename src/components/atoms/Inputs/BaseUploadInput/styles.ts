import { SIZE } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const baseUploadInput = cva(
  `relative flex justify-center items-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 pointer cursor-pointer `,
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
