import { Typography } from '@ui/atoms/Typography';
import { TableCell } from '../BaseTableTypes';

export function FunctionCell({ row, head }: TableCell) {
  return (
    <Typography
      size={head?.size ? head?.size : 'body3'}
      type="div"
      className="whitespace-no-wrap break-all"
    >
      {head?.function(row)}
    </Typography>
  );
}
