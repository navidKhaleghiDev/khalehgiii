import checkBoldIcon from '@iconify-icons/ph/check-bold';
import xIcon from '@iconify-icons/ph/x';
import { BaseIcon } from '@ui/atoms/BaseIcon';
import { Typography } from '@ui/atoms/Typography';

import { ComponentTableProps } from '../../../types';

export function Check({ id, header }: ComponentTableProps) {
  const sizeCondition = header?.variant || 'body3';

  return (
    <Typography
      variant={sizeCondition}
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
