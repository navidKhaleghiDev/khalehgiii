import { cva } from 'class-variance-authority';

export const menuItemStyles = cva(
  `flex fill-current items-center justify-between w-full h-10 px-3 hover:text-gray-900 transition-all duration-150	ease-linear rounded-lg whitespace-nowrap dark:text-gray-300`,
  {
    variants: {
      active: {
        true: `bg-gray-100  text-gray-900 dark:bg-gray-800`,
      },
      isChildren: {
        true: ` text-gray-400`,
        undefined: 'my-2 rounded',
      },
      isActiveChildren: {
        true: ` `,
        undefined: '',
      },
    },
    defaultVariants: {
      active: false,
      // isChildren: undefined,
    },
  }
);

export const menuChildItemStyles = cva('', {
  variants: {
    active: {
      true: `border-r-4 border-teal-600 hover:bg-neutral-200`,
    },
  },
  defaultVariants: {
    active: false,
    // isChildren: undefined,
  },
});