import { cva } from 'class-variance-authority';

export const tooltipStyles = cva(
  'absolute -z-10 h-2.5 w-2.5 rotate-45 rounded-sm bg-gray-400 dark:bg-gray-800',
  {
    variants: {
      position: {
        left: 'right-[-3px] top-1/2 -translate-y-1/2',
        topStart: 'bottom-[-3px] right-1 -translate-x-2/3',
        top: 'bottom-[-3px] left-1/2 -translate-x-1/2',
        topEnd: 'bottom-[-3px] left-1 translate-x-2/3',
        right: 'left-[-3px] top-1/2 -translate-y-1/2',
        bottomStart: 'top-[-3px] right-1 -translate-x-2/3',
        bottom: 'top-[-3px] left-1/2 -translate-x-1/2',
        bottomEnd: 'top-[-3px] left-1 translate-x-2/3',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);

export const containerTooltipStyles = cva(
  'absolute z-20 whitespace-nowrap rounded-lg bg-gray-400 dark:bg-gray-800 py-2 px-2 text-xs text-white leading-4',
  // 'absolute z-20 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100',
  {
    variants: {
      position: {
        left: 'right-full top-1/2  mr-3 -translate-y-1/2',
        topStart: 'bottom-full left-0  mb-3 -translate-x-2/3',
        top: 'bottom-full left-1/2  mb-3 -translate-x-1/2',
        topEnd: 'bottom-full right-0  mb-3 translate-x-2/3',
        right: 'left-full top-1/2  ml-3 -translate-y-1/2',
        bottomStart: 'top-full left-0  mt-3 -translate-x-2/3',
        bottom: 'top-full left-1/2  mt-3 -translate-x-1/2',
        bottomEnd: 'top-full right-0  mt-3 translate-x-2/3',
      },
      show: {
        true: '',
        false: 'hidden',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);
