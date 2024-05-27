import { cva } from 'class-variance-authority';

export const baseUploadInput = cva(
  `relative flex justify-center items-center w-18 h-18  overflow-hidden pointer cursor-pointer  `
);
export const baseUploadInputImage = cva(
  `relative flex justify-center items-center w-20 h-16  rounded-full  overflow-hidden pointer cursor-pointer `
);
