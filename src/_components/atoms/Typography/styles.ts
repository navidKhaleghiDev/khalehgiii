import { PALLET, SIZE } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const typographyStyles = cva('', {
  variants: {
    color: {
      teal: `${PALLET.TEXT_COLOR.TEAL} `,
      neutral: `${PALLET.TEXT_COLOR.NEUTRAL}  `,
      neutralLight: `${PALLET.TEXT_COLOR.NEUTRAL_LIGHT}`,
      neutralMiddle: `${PALLET.TEXT_COLOR.NEUTRAL_MIDDLE}`,
      neutralDark: `${PALLET.TEXT_COLOR.NEUTRAL_DARK}`,
      yellow: `${PALLET.TEXT_COLOR.YELLOW} `,
      redLight: `${PALLET.TEXT_COLOR.RED_LIGHT}`,
      red: `${PALLET.TEXT_COLOR.RED} `,
      white: `${PALLET.TEXT_COLOR.WHITE} `,
      black: `${PALLET.TEXT_COLOR.BLACK}`,
    },
    variant: {
      h1: SIZE.TYPOGRAPHY.H1,
      h2: SIZE.TYPOGRAPHY.H2,
      h3: SIZE.TYPOGRAPHY.H3,
      h4: SIZE.TYPOGRAPHY.H4,
      body1: SIZE.TYPOGRAPHY.BODY1,
      body2: SIZE.TYPOGRAPHY.BODY2,
      body3: SIZE.TYPOGRAPHY.BODY3,
      body4: SIZE.TYPOGRAPHY.BODY4,
      body5: SIZE.TYPOGRAPHY.BODY5,
      body6: SIZE.TYPOGRAPHY.BODY6,
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
});
