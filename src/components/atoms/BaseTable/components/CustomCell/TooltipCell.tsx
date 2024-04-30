import { Typography } from '@ui/atoms/Typography';
import ToolTip from '@ui/atoms/Tooltip';
import { IComponentTable } from '../../types';

export function TooltipCell({ row, id, header }: IComponentTable) {
  const variant = header?.variant ? header?.variant : 'body4';
  variant as string;
  const title = row[id] ? row[id] : '--';

  return (
    <div
      role="button"
      tabIndex={0}
      className={`absolute -z-1 cursor-text flex `}
    >
      <ToolTip tooltip={title} position="top">
        <Typography variant={variant} type="div">
          {title}
        </Typography>
      </ToolTip>
    </div>
  );
}
