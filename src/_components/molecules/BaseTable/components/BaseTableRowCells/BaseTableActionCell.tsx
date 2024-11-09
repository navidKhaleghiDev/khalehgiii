import { IconButton } from '@redesignUi/atoms/BaseButton';
import { useTranslation } from 'react-i18next';
import ToolTip from '@redesignUi/atoms/Tooltip';
import { useCallback } from 'react';
import {
  ActionCellFunction,
  ActionItem,
  BaseTableActionCellProps,
  IdItem,
} from '../../types';

/**
 * Renders action buttons for a table row, including optional tooltips for each action.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableActionCellProps<T>} props - The props object for the `BaseTableActionCell` component.
 * @param {T} props.row - The data object for the current row, containing the information to be acted upon.
 * @param {Object} props.header - The header object that includes action definitions.
 * @param {Function} [props.onClick] - An optional click handler for the action buttons.
 *
 * @returns {JSX.Element | null} The rendered action buttons or null if no actions are defined in the header.
 */

export function BaseTableActionCell<T extends IdItem>(
  props: BaseTableActionCellProps<T>
) {
  const { row, header, onClick } = props;
  const { t } = useTranslation();

  const ActionComponent = useCallback(
    ({ action }: ActionCellFunction) => (
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
    header?.type === 'action' && (
      <div className="flex">
        {header.action.map((action: ActionItem) => (
          <div key={action.action}>
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
