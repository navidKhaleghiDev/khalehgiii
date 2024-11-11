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
export const baseTableMenuCell = cva(
  `flex gap-2 !justify-start border-none !font-normal w-full !text-sm !text-right`,
  {
    variants: {
      color: {
        teal: ` 
        bg-teal-500 text-white 
        hover:bg-teal-600 active:bg-teal-700
        disabled:bg-teal-500 disabled:text-white disabled:opacity-40 
        dark:bg-teal-400 dark:text-gray-700
        dark:hover:bg-teal-500 dark:active:bg-teal-600
        dark:disabled:bg-teal-400 dark:disabled:text-teal-700 dark:disabled:opacity-40`,
        redNoBg: `
        text-red-500 hover:text-red-600 active:text-red-700 disabled:opacity-40 
        dark:text-red-300 dark:hover:text-red-400 dark:active:text-red-500 dark:disabled:text-red-100`,
        neutral: `
        bg-white text-gray-500 border-[0.063rem] border-gray-200
        hover:bg-gray-100 hover:text-gray-600 
        active:bg-gray-200 active:text-gray-600 
        disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-40
        dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500
        dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:hover:border-gray-600
        dark:active:bg-gray-800 dark:active:text-gray-100 dark:active:border-gray-800
        dark:disabled:bg-gray-600 dark:disabled:text-gray-100 dark:disabled:opacity-40`,
        neutralNoBg: `
        text-gray-500 hover:text-gray-600 active:text-gray-900 disabled:opacity-40 
        dark:text-gray-300 dark:hover:text-gray-200 dark:active:text-gray-100 dark:disabled:text-[#4B5563]`,
        neutralMedium: `absolute text-gray-400 group-has-[:focus]:text-gray-900 group-has-[:disabled]:text-gray-200 dark:group-has-[:focus]:text-gray-200 dark:group-has-[:disabled]:text-gray-500`,
        redNoBgInput:
          'absolute text-red-500 dark:text-red-500 dark:active:text-red-500 group-has-[:disabled]:text-gray-500',
      },
    },
  }
);
// last:border-b-0 first:border-t-0 border-x-0
