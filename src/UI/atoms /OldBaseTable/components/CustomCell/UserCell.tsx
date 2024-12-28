import { Typography } from '@ui/atoms/Typography';
import { ComponentTableProps } from '../../types';

export function UserCell({ row, id, header }: ComponentTableProps) {
  const username = id.map((i: string) => `${row[i]} `);

  return (
    <Typography
      variant={header?.variant ? header?.variant : 'body4'}
      type="div"
      className="max-h-14"
    >
      {username ?? '--'}
    </Typography>
  );
}
