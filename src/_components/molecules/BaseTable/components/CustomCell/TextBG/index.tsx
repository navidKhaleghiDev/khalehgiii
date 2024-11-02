import { Typography } from '@redesignUi/atoms';

import { VariantProps } from 'class-variance-authority';
import { useTranslation } from 'react-i18next';
import { TextBGStyles } from './styles';

interface TextBGProps extends VariantProps<typeof TextBGStyles> {
  title: string;
  translate?: boolean;
}

export function TextBG({ title, color, translate }: TextBGProps) {
  const { t } = useTranslation();
  return (
    <Typography className={`${TextBGStyles({ color })}`} variant="body5">
      {translate ? t(`${title}`) : title}
    </Typography>
  );
}
