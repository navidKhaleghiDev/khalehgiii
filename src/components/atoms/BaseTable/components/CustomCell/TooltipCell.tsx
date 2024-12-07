import { Typography } from '@ui/atoms/Typography';
import { ComponentTableProps } from '../../types';

export function TooltipCell({ row, id, header }: ComponentTableProps) {
  const variant = header?.variant ? header?.variant : 'body4';
  variant as string;
  const title = row[id] ? row[id] : '--';
  const conditionType = title.length >= 12 || typeof title === 'object';

  const titleStyle = conditionType
    ? 'max-w-[20vh] group-hover:border  p-2 group-hover:bg-black group-hover:shadow-lg transition duration-400 group-hover:absolute group-hover:max-w-full group-hover:cursor-text group-hover:text-white rounded-md z-100'
    : '';

  return (
    <div
      role="button"
      tabIndex={0}
      className={`-z-1 overflow-hidden overflow-ellipsis flex cursor-text ${titleStyle} `}
    >
      <Typography variant={variant} type="div">
        {title}
      </Typography>
    </div>
  );
}
