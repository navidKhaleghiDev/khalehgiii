import { Typography } from '@ui/atoms/Typography';
import { IComponentTable } from '../../types';

export function FunctionCell({ row, header, id }: IComponentTable) {
  return (
    <Typography
      size={header?.size ? header?.size : 'body3'}
      type="div"
      className="whitespace-no-wrap break-all"
    >
      {header?.function(row[id])}
    </Typography>
  );
}
