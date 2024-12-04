/* eslint-disable react/no-array-index-key */
import { IconButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';
import { ComponentTableProps, ActionItemProps } from '../../types';

export function ActionCell({ row, header, onClick }: ComponentTableProps) {
  const { t } = useTranslation();
  return (
    header?.action && (
      <div className="absolute flex">
        {header.action.map((action: ActionItemProps, i: number) => (
          <IconButton
            tooltip={t(action.tooltip)}
            tooltipPosition="top"
            key={i}
            icon={action.icon}
            color={action.color}
            size={action.size}
            onClick={onClick ? () => onClick(action.action, row) : undefined}
          />
        ))}
      </div>
    )
  );
}
