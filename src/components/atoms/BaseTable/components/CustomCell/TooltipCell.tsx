import { Typography } from '@ui/atoms/Typography';
import { CustomTolltip } from '@ui/atoms/CustomTolltip';
import { IComponentTable } from '../../types';

export function TooltipCell({ row, id, header }: IComponentTable) {
  const variant = header?.variant ? header?.variant : 'body4';
  variant as string;

  return (
    <>
      <CustomTolltip title={row[id] ? row[id] : '--'} />
      <div
        role="button"
        tabIndex={0}
        className={` group cursor-text overflow-hidden overflow-ellipsis flex  `}
      >
        <Typography variant={variant} type="div">
          {row[id] ? row[id] : '--'}
        </Typography>
      </div>
    </>
  );
}
