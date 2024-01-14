import { IconButton } from '@ui/atoms/BaseButton';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { IDaAs } from '@src/services/users/types';
import { TableCell } from '../BaseTableTypes';

export function ActionLockCell({ row, id: key, onClick }: TableCell) {
  const updatedUnlock: IDaAs = {
    ...(row as IDaAs),
    is_lock: !key,
  };
  return (
    <IconButton
      icon={key ? lockKeyFillIcon : lockKeyOpenFillIcon}
      color={key ? 'redNoBg' : 'tealNoBg'}
      onClick={() => onClick('editLock', updatedUnlock)}
    />
  );
}
