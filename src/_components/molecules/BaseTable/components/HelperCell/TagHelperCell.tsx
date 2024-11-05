import { IconType } from '@src/types/global';
import { VariantProps } from 'class-variance-authority';
import { useTranslation } from 'react-i18next';

import { BaseIcon, Typography } from '@redesignUi/atoms';

import { TagHelperCellStyles } from './styles';

interface TagHelperCellProps extends VariantProps<typeof TagHelperCellStyles> {
  title: string;
  icon?: IconType;
  translate?: boolean;
}

export function TagHelperCell({
  title,
  icon,
  translate,
  color,
}: TagHelperCellProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className={TagHelperCellStyles({ color })}>
      {icon && <BaseIcon icon={icon} size="xs" />}
      <Typography variant="body5">
        {translate ? t(`${title}`) : title}
      </Typography>
    </div>
  );
}
