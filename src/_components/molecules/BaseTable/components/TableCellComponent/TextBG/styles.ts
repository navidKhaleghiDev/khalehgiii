import { cva } from 'class-variance-authority';

export const TextBGStyles = cva('rounded py-0.5 px-1.5', {
  variants: {
    color: {
      yellow: 'bg-yellow-100 text-yellow-600',
      teal: 'bg-teal-100 text-teal-500',
      red: 'bg-red-100 text-red-600',
    },
  },
});
