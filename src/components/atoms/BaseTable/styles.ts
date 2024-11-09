import { cva } from 'class-variance-authority';
import { TYPOGRAPHY_VARIANT } from '../Typography/styles';

export const baseTableHeader = cva(
  `flex justify-center items-center font-normal  `,
  {
    variants: {
      variant: TYPOGRAPHY_VARIANT,
      fixed: {
        true: 'px-2 bg-teal-500 dark:bg-gray-600  h-10',
      },
    },
    defaultVariants: {
      fixed: false,
    },
  }
);

export const baseTableRowCard = cva(
  `flex justify-center items-center group text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6 header `,
  {
    variants: {
      variant: TYPOGRAPHY_VARIANT,
      fixed: {
        true: 'bg-gray-100 dark:bg-slate-800 h-14 px-2',
      },
    },
    defaultVariants: {
      fixed: false,
    },
  }
);
