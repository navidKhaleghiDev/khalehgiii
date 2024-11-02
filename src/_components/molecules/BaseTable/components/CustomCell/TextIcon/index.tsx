import { IconType } from '@src/types/global';
import { VariantProps } from 'class-variance-authority';
import { useTranslation } from 'react-i18next';

import { BaseIcon, Typography } from '@redesignUi/atoms';

import { TextIconStyle } from './styles';

interface TextIconProps extends VariantProps<typeof TextIconStyle> {
  title: string;
  icon: IconType;
  translate?: boolean;
}

export function TextIcon({
  title,
  icon,
  translate,
  color,
}: TextIconProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className={TextIconStyle({ color })}>
      <BaseIcon icon={icon} size="xs" />
      <Typography variant="body5">
        {translate ? t(`${title}`) : title}
      </Typography>
    </div>
  );
}
