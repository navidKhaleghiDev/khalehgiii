import { Typography } from '@ui/atoms/Typography';
import { IComponentTable } from '../../types';

export function NoneCell({ row, id, header }: IComponentTable) {
  return (
    <div role="button" tabIndex={0} className=" flex cursor-text">
      <Typography
        variant={header?.variant ? header?.variant : 'body4'}
        type="div"
      >
        {row[id] ? row[id] : '--'}
      </Typography>
    </div>
  );
}
