import { cva } from 'class-variance-authority';

export const inputRadioButtonStyles = cva(
  `peer relative cursor-pointer appearance-none rounded-full before:absolute bg-white dark:bg-gray-500 checked:bg-teal-500 dark:checked:bg-teal-500 border border-gray-300 checked:border-teal-500 before:content[''] before:w-2 before:h-2 before:block before:bg-white before:rounded before:opacity-0 checked:before:opacity-100 dark:checked:border-teal-500`,
  {
    variants: {
      size: {
        sm: 'size-4 before:top-[0.188rem] before:right-[0.188rem]',
        md: 'size-5 before:top-[0.313rem] before:right-[0.313rem]',
        responsive:
          'sm:size-5 sm:before:top-[0.313rem] sm:before:right-[0.313rem] size-4 before:top-[0.188rem] before:right-[0.188rem]',
      },
    },
    defaultVariants: {
      size: 'responsive',
    },
  }
);

export const labelRadioButtonStyles = cva(
  `relative flex items-center rounded-full cursor-pointer text-gray-400 peer-checked:text-gray-900 dark:text-gray-300 dark:peer-checked:text-white`
);