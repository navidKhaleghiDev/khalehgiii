import { cva } from 'class-variance-authority';

export const doughnutChartStyles = cva(
  'absolute top-0 left-0 text-center rounded-full flex items-center justify-center transform text-gray-900 dark:text-white',
  {
    variants: {
      color: {
        blueLight: 'bg-blue-100',
        blue: 'bg-blue-100',
        red: 'bg-red-100',
        tealLight: 'bg-teal-100',
        teal: 'bg-white dark:bg-gray-600',
        tealDark: 'bg-teal-100',
        yellow: 'bg-yellow-100',
        purpleLight: 'bg-purple-100',
        purple: 'bg-purple-100',
      },
      type: {
        license:
          'sm:w-14 sm:h-14 w-9 h-9 text-xs text-gray-900 sm:translate-x-[21%] sm:translate-y-[30%] translate-x-[28%] translate-y-[41.5%] dark:bg-gray-600',
        expireService:
          'w-11 h-11 shadow-md translate-x-[41%] translate-y-[52%] dark:bg-gray-600',
      },
    },
    defaultVariants: {
      color: 'blue',
    },
  }
);
