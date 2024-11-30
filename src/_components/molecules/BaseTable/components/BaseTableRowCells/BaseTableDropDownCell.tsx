import { useTranslation } from 'react-i18next';
import { BaseTableDropDownCellProps, IdItem } from '../../types';
import DropDownHelperCell from '../HelperCell/DropDownHellperCell';

/**
 * Base Table DropDown Cell Component.
 *
 * This component renders a dropdown cell within a table, providing dynamic
 * options and translations. It is used for rows with a `drop` type in the header
 * configuration.
 *
 * @template T
 * @param {BaseTableDropDownCellProps<T>} props - The props for the dropdown cell component.
 * @param {T} props.row - The data for the current row.
 * @param {object} props.header - The header configuration for the dropdown column.
 * @param {string} props.header.type - The type of the column (must be 'drop' for this cell to render).
 * @param {object} props.header.drop - Configuration for the dropdown options.
 * @param {Array<object>} props.header.drop.options - Array of dropdown options.
 * @param {string} props.header.drop.defaultValueLabelKey - Key for the default label in the row data.
 * @param {string} props.header.drop.defaultValueKey - Key for the default value in the row data.
 * @param {string} props.header.drop.translateKey - Translation key prefix for dropdown labels.
 * @param {function} props.onClick - Callback triggered when a dropdown option is selected.
 *
 * @returns {JSX.Element|null} - The rendered dropdown cell or null if the header type is not 'drop'.
 */

export function BaseTableDropDownCell<T extends IdItem>(
  props: BaseTableDropDownCellProps<T>
) {
  const { t } = useTranslation();
  const { row, header, onClick } = props;

  if (header?.type === 'drop') {
    const { options, defaultValueLabelKey, translateKey, defaultValueKey } =
      header.drop;

    return (
      <div className="flex">
        <DropDownHelperCell
          onClick={(e: any) =>
            onClick
              ? onClick(e.value, {
                  ...row,
                  value: e.value,
                })
              : undefined
          }
          options={options}
          defaultValue={{
            id: row[defaultValueKey],
            label: t(`${translateKey}.${row[defaultValueLabelKey]}`),
            value: row[defaultValueLabelKey],
          }}
        />
      </div>
    );
  }

  return null;
}
