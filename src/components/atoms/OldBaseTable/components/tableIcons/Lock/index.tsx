import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import { BaseIcon } from '@ui/atoms/BaseIcon';

export function Lock({ id }: any) {
  return (
    <BaseIcon
      icon={id ? lockKeyFillIcon : lockKeyOpenFillIcon}
      color={id ? 'red' : 'teal'}
    />
  );
}
