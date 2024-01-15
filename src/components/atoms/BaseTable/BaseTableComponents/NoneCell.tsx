import { Typography } from '@ui/atoms/Typography';
import ToolTip from '@ui/atoms/Tooltip';

export function NoneCell({ row, id, head }: any) {
  return (
    <ToolTip position="bottom" tooltip={row[id]}>
      <Typography
        size={head?.size ? head?.size : 'body3'}
        type="div"
        className="max-h-14"
      >
        {row[id]}
      </Typography>
    </ToolTip>
  );
}
