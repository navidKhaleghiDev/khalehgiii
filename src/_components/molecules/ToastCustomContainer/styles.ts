import { cva } from 'class-variance-authority';

export const toastStyle = cva(
  'flex justify-end text-gray-700 border dark:bg-gray-700 mb-2.5',
  {
    variants: {
      typeToast: {
        success:
          'bg-teal-100 border-teal-400 dark:text-teal-400 dark:border-teal-400',
        error:
          'bg-red-100 border-red-400 dark:text-red-300 dark:border-red-300',
        info: 'bg-gray-100 border-gray-400 dark:text-gray-300 dark:border-gray-300',
      },
    },
  }
);

export const toastIconStyle = cva('', {
  variants: {
    type: {
      success: 'dark:text-teal-400',
      error: 'dark:text-red-300',
      info: 'dark:text-gray-300',
    },
    size: {
      sm: 'w-[17.188rem] h-14',
      md: 'w-[21.875rem] h-20',
      lg: 'w-[33.75rem] h-20',
      responsive:
        'w-[17.188rem] h-14 sm:w-[21.875rem] sm:h-20 md:w-[33.75rem] md:h-20',
    },
    dir: {
      rtl: 'left-auto right-4',
      ltr: 'right-auto left-4',
    },
  },
});
