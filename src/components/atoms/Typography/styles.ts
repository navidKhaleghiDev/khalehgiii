import { PALLET, SIZE } from '@src/constants/theme';
import { cva } from 'class-variance-authority';

export const typographyStyles = cva('', {
  variants: {
    color: {
      teal: `${PALLET.TEXT_COLOR.TEAL} `,
      neutral: `${PALLET.TEXT_COLOR.NEUTRAL}  `,
      yellow: `${PALLET.TEXT_COLOR.YELLOW} `,
      red: `${PALLET.TEXT_COLOR.RED} `,
    },
    size: {
      h1: SIZE.TYPOGRAPHY.H1,
      h2: SIZE.TYPOGRAPHY.H2,
      h3: SIZE.TYPOGRAPHY.H3,
      h4: SIZE.TYPOGRAPHY.H4,
      h5: SIZE.TYPOGRAPHY.H5,
      h6: SIZE.TYPOGRAPHY.H6,
      body1: SIZE.TYPOGRAPHY.BODY1,
      body2: SIZE.TYPOGRAPHY.BODY2,
      body3: SIZE.TYPOGRAPHY.BODY3,
      body4: SIZE.TYPOGRAPHY.BODY4,
      caption: SIZE.TYPOGRAPHY.CAPTION,
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
});
