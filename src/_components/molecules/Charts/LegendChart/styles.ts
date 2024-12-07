import { cva } from 'class-variance-authority';

export const LegendStyles = cva(
  "flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap",
  {
    variants: {
      color: {
        blue: 'before:bg-blue-400',
        teal: 'before:bg-teal-400',
        purple: 'before:bg-purple-400',
      },
    },
  }
);
