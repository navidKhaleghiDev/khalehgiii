import { cva } from 'class-variance-authority';

export const tooltipStyles = cva(
  'absolute -z-10 h-2 w-2 rotate-45 rounded-sm bg-black',
  {
    variants: {
      position: {
        left: 'right-[-3px] top-1/2 -translate-y-1/2',
        top: 'bottom-[-3px] left-1/2 -translate-x-1/2',
        right: 'left-[-3px] top-1/2 -translate-y-1/2',
        bottom: 'top-[-3px] left-1/2 -translate-x-1/2',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
);

export const containerTooltipStyles = cva(
  'absolute z-20 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white',
  // 'absolute z-20 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100',
  {
    variants: {
      position: {
        left: 'right-full top-1/2  mr-3 -translate-y-1/2',
        top: 'bottom-full left-1/2  mb-3 -translate-x-1/2',
        right: 'left-full top-1/2  ml-3 -translate-y-1/2',
        bottom: 'top-full left-1/2  mt-3 -translate-x-1/2',
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
