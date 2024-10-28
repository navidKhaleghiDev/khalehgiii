import { cva } from 'class-variance-authority';

export const baseTableHeaderStyles = cva(
  `w-full flex items-center px-3 justify-start rounded-xl h-8 bg-white mb-3 text-gray-500 dark:bg-gray-600 dark:text-gray-100 text-xs`,
  {
    variants: {},
    defaultVariants: {
      fixed: false,
    },
  }
);

export const baseTableRowStyles = cva(
  `md:h-16  h-10  w-full flex items-center justify-start px-3 `,
  {
    variants: {
      isOpen: {
        true: 'bg-gray-100 border border-gray-400 dark:bg-gray-800',
        false:
          'bg-white border border-gray-200 dark:bg-gray-600 dark:border-gray-400',
      },
      radiusTop: {
        true: ' rounded-t-lg md:rounded-t-2xl',
        false: '',
      },
      radiusButton: {
        true: ' rounded-b-lg md:rounded-b-2xl',
        false: '',
      },
    },
  }
);
export const baseTableCollapseDesktop = cva(
  `py-2 gap-4 flex justify-start h-full bg-gray-100 border border-gray-400 border-t-0 transition duration-150 ease-in-out  dark:bg-gray-800`
);
export const baseTableCollapseMobile = cva(
  `bg-gray-100 border border-gray-300  dark:bg-gray-800  `
);
// last:border-b-0 first:border-t-0 border-x-0
