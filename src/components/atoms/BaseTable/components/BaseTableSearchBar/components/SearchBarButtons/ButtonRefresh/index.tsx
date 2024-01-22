import { IconButton } from '@ui/atoms/BaseButton';
import ToolTip from '@ui/atoms/Tooltip';
import { useTranslation } from 'react-i18next';
import { ITableSearchButton } from '../../../types';

export function TableSearchbarButton({ componentProps }: ITableSearchButton) {
  const { color, icon, size, handleClickButton, label } = componentProps;
  const { t } = useTranslation();
  return (
    <ToolTip tooltip={t(label)} position="right">
      <IconButton
        icon={icon}
        color={color}
        size={size}
        onClick={handleClickButton}
      />
    </ToolTip>
  );
}
