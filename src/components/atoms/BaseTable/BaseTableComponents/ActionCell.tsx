import { IconButton } from '@ui/atoms/BaseButton';
import { TableCell } from '../BaseTableTypes';

export function ActionCell({ row, head, onClick }: TableCell) {
  return (
    <>
      {head?.action.map((action, index) => (
        <IconButton
          key={index}
          {...action}
          onClick={() => onClick(action.action, row)}
        />
      ))}
    </>
  );
}
