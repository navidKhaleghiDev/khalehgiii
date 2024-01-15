/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-useless-fragment */
import { IconButton } from '@ui/atoms/BaseButton';
import { TableCell } from '../BaseTableTypes';

export function ActionCell({ row, head, onClick }: TableCell) {
  return (
    <>
      {head?.action &&
        head.action.map((action, index) => (
          <IconButton
            key={index}
            {...action}
            onClick={() => onClick(action.action, row)}
          />
        ))}
    </>
  );
}
