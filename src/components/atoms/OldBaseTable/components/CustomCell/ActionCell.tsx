import { IconButton } from '@ui/atoms/BaseButton';
/* eslint-disable react/no-array-index-key */
import { useTranslation } from 'react-i18next';
import { ToolTip } from '@ui/atoms/Tooltip';
import { ComponentTableProps, ActionItemProps } from '../../types';

export function ActionCell({ row, header, onClick }: ComponentTableProps) {
  const { t } = useTranslation();
  return (
    header?.action && (
      <div className="absolute flex">
        {header.action.map((action: ActionItemProps, i: number) => (
          // eslint-disable-next-line react/jsx-key
          <ToolTip tooltip={t(action.tooltip)} position="top">
            <IconButton
              key={i}
              icon={action.icon}
              color={action.color}
              size={action.size}
              onClick={onClick ? () => onClick(action.action, row) : undefined}
            />
          </ToolTip>
        ))}
      </div>
    )
  );
}
