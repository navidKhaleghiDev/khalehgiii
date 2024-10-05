import { cva } from 'class-variance-authority';

export const baseButtonStyles = cva(
  `flex items-center justify-center transition duration-150 ease-in-out rounded-lg focus:outline-none p-2 font-semibold leading-6 gap-1`,
  {
    variants: {
      type: {
        teal: `
        bg-teal-500 text-white 
        hover:bg-teal-600 active:bg-teal-700
        disabled:bg-teal-500 disabled:text-white disabled:opacity-40 
        dark:bg-teal-400 dark:text-gray-700
        dark:hover:bg-teal-500 dark:active:bg-teal-600
        dark:disabled:bg-teal-400 dark:disabled:text-teal-700 dark:disabled:opacity-40`,
        inactive: `
        bg-teal-500 text-white opacity-40
        hover:bg-teal-600 active:bg-teal-700
        disabled:bg-teal-500 disabled:text-white disabled:opacity-40 
        dark:bg-teal-400 dark:text-gray-700
        dark:hover:bg-teal-500 dark:active:bg-teal-600
        dark:disabled:bg-teal-400 dark:disabled:text-teal-700 dark:disabled:opacity-40`,
        red: ` 
        bg-red-100 text-red-600 
        hover:bg-red-200 active:bg-red-300
        disabled:bg-red-100 disabled:text-red-600 disabled:opacity-40 
        dark:bg-red-300 dark:text-white
        dark:hover:bg-red-400 dark:active:bg-red-500  
        dark:disabled:bg-red-300 dark:disabled:text-white dark:disabled:opacity-40`,
        neutral: ` 
        bg-white text-gray-500 border-[0.063rem] border-gray-200
        hover:bg-gray-100 hover:text-gray-600 
        active:bg-gray-200 active:text-gray-600 
        disabled:bg-gray-200 disabled:text-gray-900 disabled:opacity-40
        dark:bg-gray-600 dark:text-gray-300 dark:border-gray-500
        dark:hover:bg-gray-600 dark:hover:text-gray-100 dark:hover:border-gray-600
        dark:active:bg-gray-800 dark:active:text-gray-100 dark:active:border-gray-800
        dark:disabled:bg-gray-600 dark:disabled:text-gray-100 dark:disabled:opacity-40`,
        tertiary: ` 
        text-gray-500 
        hover:text-gray-700                            
        disabled:text-gray-300
        dark:text-gray-200
        dark:hover:text-gray-400
        dark:disabled:text-gray-500`,
      },
      size: {
        sm: 'h-10 w-[5.94rem]',
        md: 'h-10 w-40',
        lg: 'h-10 w-[11.88rem]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      type: 'teal',
      size: 'md',
    },
  }
);
export const loadingStyle = cva(
  'flex items-center justify-center rounded-lg p-2 cursor-default',
  {
    variants: {
      type: {
        teal: 'bg-teal-700 dark:bg-teal-600',
        red: 'bg-red-300 dark:bg-red-500',
        neutral: 'bg-gray-200 dark:bg-gray-800',
        inactive: '',
        tertiary: '',
      },
      size: {
        sm: 'h-10 w-[5.94rem]',
        md: 'h-10 w-40',
        lg: 'h-10 w-[11.88rem]',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      type: 'teal',
      size: 'md',
    },
  }
);

export const iconButtonStyles = cva(
  'flex items-center justify-center rounded-lg',
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
      size: {
        sm: 'h-7 w-7',
        md: 'h-10 w-10',
      },
    },
    defaultVariants: {
      color: 'teal',
      size: 'md',
    },
  }
);
