import { Typography } from '@ui/atoms/Typography';

export function NoneCell({ row, id, head }: any) {
  return (
    <div role="button" tabIndex={0} className=" flex cursor-text">
      <Typography size={head?.size ? head?.size : 'body3'} type="div">
        {row[id]}
      </Typography>
    </div>
  );
}
