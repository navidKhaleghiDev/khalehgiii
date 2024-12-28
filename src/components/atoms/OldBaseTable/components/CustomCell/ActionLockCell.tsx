import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { useTranslation } from 'react-i18next';
import { ToolTip } from '@ui/atoms/Tooltip';
import { IconButton } from '@ui/atoms/BaseButton';

import { ComponentTableProps } from '../../types';

export function ActionLockCell({ row, id: key, onClick }: ComponentTableProps) {
  const { t } = useTranslation();
  const updatedUnlock = {
    ...row,
    is_lock: !key,
  };

  return (
    <div>
      <ToolTip tooltip={t('table.desktop')} position="top">
        <IconButton
          icon={key ? lockKeyFillIcon : lockKeyOpenFillIcon}
          color={key ? 'redNoBg' : 'neutralNoBg'}
          onClick={() => onClick && onClick('editLock', updatedUnlock)}
        />
      </ToolTip>
    </div>
  );
}
