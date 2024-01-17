/* eslint-disable react/no-array-index-key */
import { IconButton } from '@ui/atoms/BaseButton';
import { IComponentTable, IActionItem } from '../../types';

export function ActionCell({ row, header, onClick }: IComponentTable) {
  return (
    header?.action && (
      <>
        {header.action.map((action: IActionItem, i: number) => (
          <IconButton
            key={i}
            icon={action.icon}
            color={action.color}
            size={action.size}
            onClick={onClick ? () => onClick(action.action, row) : undefined}
          />
        ))}
      </>
    )
  );
}
