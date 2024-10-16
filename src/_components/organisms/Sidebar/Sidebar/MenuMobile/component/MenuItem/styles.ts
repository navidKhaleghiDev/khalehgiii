import { PALLET } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const menuItemStyles = cva(
  `flex fill-current items-center w-full h-10 px-2 hover:bg-teal-600  hover:text-white  transition-all	duration-150	ease-linear rounded-full

 `,
  {
    variants: {
      active: {
        true: `${PALLET.BG_COLOR.TEAL_DARK} ${PALLET.TEXT_COLOR.WHITE} `,
      },
      isChildren: {
        true: `${PALLET.BG_COLOR.TEAL_DARK} ${PALLET.TEXT_COLOR.WHITE} `,
        undefined: 'my-2 ',
      },
      isActiveChildren: {
        true: `border-r-4 border-teal-500 `,
        undefined: '',
      },
    },
    defaultVariants: {
      active: false,
      // isChildren: undefined,
    },
  }
);
// border-r-4 border-teal-600

// export const menuChildItemStyles = cva(
//   `${PALLET.TEXT_COLOR.NEUTRAL} ${PALLET.BG_COLOR.TEAL}`,
//   {
//     variants: {
//       active: {
//         true: `border-r-4 border-teal-600 hover:bg-neutral-200`,
//       },
//     },
//     defaultVariants: {
//       active: false,
//       // isChildren: undefined,
//     },
//   }
// );
