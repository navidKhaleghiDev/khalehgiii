import { Typography } from '@ui/atoms/Typography';
import { IComponentTable } from '../../types';

export function FunctionCell({ row, header, id }: IComponentTable) {
  return (
    <Typography
      variant={header?.variant ? header?.variant : 'body4'}
      type="div"
      className="whitespace-no-wrap break-all"
    >
      {header?.function(row[id])}
    </Typography>
  );
}
