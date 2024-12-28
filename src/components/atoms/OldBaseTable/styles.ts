import { cva } from 'class-variance-authority';

export const baseTableHeader = cva(
  `flex justify-center items-center font-normal  `,
  {
    variants: {
      variant: {},
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
      variant: {},
      fixed: {
        true: 'bg-gray-100 dark:bg-slate-800 h-14 px-2',
      },
    },
    defaultVariants: {
      fixed: false,
    },
  }
);
