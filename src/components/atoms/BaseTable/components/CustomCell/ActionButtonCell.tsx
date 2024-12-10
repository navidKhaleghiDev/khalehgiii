import { IconButton } from '@ui/atoms/BaseButton';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { useTranslation } from 'react-i18next';
import { ComponentTableProps } from '../../types';

export function ActionButtonCell({
  row,
  id: key,
  onClick,
}: ComponentTableProps) {
  const { t } = useTranslation();
  const updatedUnlock = {
    ...row,
    is_lock: !key,
  };

  return (
    <div className="absolute">
      <IconButton
        tooltip={t('table.desktop')}
        tooltipPosition="top"
        icon={key ? lockKeyFillIcon : lockKeyOpenFillIcon}
        color={key ? 'redNoBg' : 'tealNoBg'}
        onClick={() => onClick && onClick('editLock', updatedUnlock)}
      />
    </div>
  );
}
