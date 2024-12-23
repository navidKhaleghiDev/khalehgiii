import lockKeyFillIcon from '@iconify-icons/ph/lock-laminated';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-simple-open';
import { IconButton } from '@ui/atoms/BaseButton';
import { ComponentTableProps } from '@ui/atoms/OldBaseTable/types';
import { ToolTip } from '@ui/atoms/Tooltip';
import { useTranslation } from 'react-i18next';

export function ActionLockHelperCell({
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
    <div>
      <ToolTip tooltip={t('table.block')}>
        <IconButton
          size="md"
          icon={key ? lockKeyFillIcon : lockKeyOpenFillIcon}
          className={`!justify-end ${
            key
              ? '!text-yellow-600 dark:!text-yellow-300'
              : '!text-gray-500 dark:!text-gray-200'
          }`}
          classNameIcon=""
          color="neutralNoBg"
          onClick={() => onClick && onClick('editLock', updatedUnlock)}
        />
      </ToolTip>
    </div>
  );
}
