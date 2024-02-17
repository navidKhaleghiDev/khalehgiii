import { IconButton } from '@ui/atoms/BaseButton';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { IComponentTable } from '../../types';

export function ActionLockCell({ row, id: key, onClick }: IComponentTable) {
  const updatedUnlock = {
    ...row,
    is_lock: !key,
  };

  return (
    <IconButton
      icon={key ? lockKeyFillIcon : lockKeyOpenFillIcon}
      color={key ? 'redNoBg' : 'tealNoBg'}
      onClick={() => onClick && onClick('editLock', updatedUnlock)}
    />
  );
}
