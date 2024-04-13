import { Typography } from '@ui/atoms/Typography';
import { IComponentTable } from '../../types';

export function TooltipCell({ row, id, header }: IComponentTable) {
  const titleStyle =
    row[id].length >= 12
      ? 'group-hover:border group-hover-border-gray-300 p-2 group-hover:bg-white group-hover:shadow-lg transition duration-400 group-hover:absolute group-hover:max-w-[30vw] group-hover:cursor-pointer group-hover:text-gray-800 rounded-md z-100'
      : '';
  return (
    <div
      role="button"
      tabIndex={0}
      className={`overflow-hidden overflow-ellipsis flex cursor-text ${titleStyle} `}
    >
      <Typography
        variant={header?.variant ? header?.variant : 'body4'}
        type="div"
      >
        {row[id] ? row[id] : '--'}
      </Typography>
    </div>
  );
}
