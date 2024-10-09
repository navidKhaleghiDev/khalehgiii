import { cva } from 'class-variance-authority';

export const baseDropDownStyles = cva(
  'flex justify-between items-center rounded-lg px-2',
  {
    variants: {
      intent: {
        default:
          'bg-neutral-100 text-neutral-500 border border-neutral-500 focus:border-teal-600 focus:text-teal-500 focus:placeholder-teal-500 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:border-neutral-400 disabled:shadow-none',
        error: 'text-red-600 border border-red-600 placeholder-red-400',
      },
      fullWidth: {
        true: 'w-full',
      },
      selected: {
        true: 'text-teal-600',
      },
      size: {
        sm: `w-20 h-12 text-xs`,
        md: `w-40 h-12 text-xs`,
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'sm',
    },
  }
);

export const optionSelectStyles = cva(
  'absolute bg-white dark:bg-gray-600 rounded-lg  mt-2 overflow-y-auto z-10 shadow-md',
  {
    variants: {
      isShow: {
        false: 'hidden',
      },
      fullWidth: {
        true: 'w-full',
      },
      size: {
        sm: `w-20 text-xs`,
        md: `w-20  text-sm`,
        responsive: 'w-20 text-xs md:w-20 md:text-sm',
      },
    },
    defaultVariants: {
      isShow: false,
      size: 'md',
    },
  }
);
