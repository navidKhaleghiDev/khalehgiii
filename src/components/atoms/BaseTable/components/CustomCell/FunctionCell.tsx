import { Typography } from '@ui/atoms/Typography';

export function FunctionCell({ row, head, id }: any) {
  return (
    <Typography
      size={head?.size ? head?.size : 'body3'}
      type="div"
      className="whitespace-no-wrap break-all"
    >
      {head?.function(row[id])}
    </Typography>
  );
}
