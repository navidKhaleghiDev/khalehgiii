import { cva } from 'class-variance-authority';

export const doughnutChartStyles = cva(
  'absolute top-0 left-0 w-14 h-14 text-xs text-gray-900 rounded-full flex items-center justify-center transform translate-x-[21%] translate-y-[30%] dark:bg-gray-600 dark:text-white',
  {
    variants: {
      color: {
        blueLight: 'bg-blue-100',
        blue: 'bg-blue-100',
        red: 'bg-red-100 ',
        tealLight: 'bg-teal-100',
        teal: 'bg-teal-100',
        yellow: 'bg-yellow-100',
        purpleLight: 'bg-purple-100',
        purple: 'bg-purple-100',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  }
);
