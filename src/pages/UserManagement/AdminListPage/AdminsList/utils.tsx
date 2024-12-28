import checkBoldIcon from '@iconify-icons/ph/check-bold';
import xIcon from '@iconify-icons/ph/x';
import { BaseIcon } from '@ui/atoms';

export function booleanIcon(value: string | boolean) {
  if (typeof value === 'string') return value;

  return value ? (
    <BaseIcon icon={checkBoldIcon} color="teal" />
  ) : (
    <BaseIcon icon={xIcon} color="red" />
  );
}
