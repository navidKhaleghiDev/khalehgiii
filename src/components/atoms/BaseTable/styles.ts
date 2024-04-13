import { cva } from 'class-variance-authority';

export const baseTableRowCard = cva(
  `flex justify-center items-center group text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6 header `,
  {
    variants: {
      // size: {
      //   normal: SIZE.BUTTON.NORMAL,
      //   sm: SIZE.BUTTON.SMALL,
      //   md: SIZE.BUTTON.MEDIUM,
      //   lg: SIZE.BUTTON.LARGE,
      //   xl: SIZE.BUTTON.X_LARGE,
      // },
      fixed: {
        true: 'bg-neutral-100 dark:bg-slate-800 h-14 px-2',
      },
    },
    defaultVariants: {
      fixed: false,
    },
  }
);
