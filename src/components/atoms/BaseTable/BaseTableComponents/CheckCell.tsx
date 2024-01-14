import { Typography } from '@ui/atoms/Typography';
import { BaseIcon } from '@ui/atoms/BaseIcon';
import checkBoldIcon from '@iconify-icons/ph/check-bold';
import xIcon from '@iconify-icons/ph/x';
import { TableCell, HeaderItem } from '../BaseTableTypes';

export function CheckCell({ id, head }: TableCell) {
  const sizeCondition: HeaderItem['size'] = head?.size || 'body3';
  return (
    <Typography
      size={sizeCondition}
      type="div"
      className="text-xl whitespace-no-wrap break-all"
    >
      <BaseIcon
        icon={!id ? xIcon : checkBoldIcon}
        color={!id ? 'red' : 'teal'}
      />
    </Typography>
  );
}
