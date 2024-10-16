import { IconButton } from '@redesignUi/atoms/BaseButton';
import { useTranslation } from 'react-i18next';
import ToolTip from '@redesignUi/atoms/Tooltip';
import { useCallback } from 'react';

export function BaseTableActionCell(props) {
  const { row, header, onClick } = props;
  const { t } = useTranslation();

  const ActionComponent = useCallback(
    ({ action }) => (
      <IconButton
        key={row.id}
        icon={action.icon}
        color={action.color}
        size={action.size}
        onClick={onClick ? () => onClick(action.action, row) : undefined}
      />
    ),
    [onClick, row]
  );

  return (
    header?.action && (
      <div className="flex">
        {header.action.map((action, i) => (
          <div key={i}>
            {action.tooltip ? (
              <ToolTip tooltip={t(action.tooltip)}>
                <ActionComponent action={action} />
              </ToolTip>
            ) : (
              <ActionComponent action={action} />
            )}
          </div>
        ))}
      </div>
    )
  );
}
