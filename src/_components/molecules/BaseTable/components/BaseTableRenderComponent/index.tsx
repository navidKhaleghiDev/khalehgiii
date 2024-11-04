import { BaseTableRenderComponentProps, IdItem, TableType } from '../../types';
import { BaseTableActionCell } from '../BaseTableRowCells/BaseTableActionCell';
import { BaseTableComponentCell } from '../BaseTableRowCells/BaseTableComponentCell';
import { BaseTableNoneCell } from '../BaseTableRowCells/BaseTableNoneCell';
import { BaseTableDateCell } from '../BaseTableRowCells/BaseTableDateCell';
import BaseTableAvatarCell from '../BaseTableRowCells/BaseTableAvatarCell';
import { BaseTableMenuCell } from '../BaseTableRowCells/BaseTableMenuCell';
import { BaseTableDropDownCell } from '../BaseTableRowCells/BaseTableDropDownCell';

/**
 * Renders the appropriate table cell component based on the type specified in the header.
 * The component dynamically selects and renders one of several possible cell types
 * (e.g., action, date, avatar) based on the provided header type.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableRenderComponentProps<T>} props - The props object for the table render component.
 * @param {Object} props.header - The header configuration for the current cell, which includes type and id.
 * @param {T} props.row - The data for the current row, containing the information to be displayed in the cell.
 * @param {function} [props.onClick] - Optional callback function for handling click actions on the cell.
 *
 * @returns {JSX.Element} The rendered table cell component based on the header type.
 */

export function BaseTableRenderComponent<T extends IdItem>(
  props: BaseTableRenderComponentProps<T>
) {
  const { header, row, onClick } = props;

  const id = header?.id;

  const Components: Record<TableType, JSX.Element> = {
    none: <BaseTableNoneCell row={row} id={id} header={header} />,
    component: (
      <BaseTableComponentCell
        row={row}
        header={header}
        id={id}
        onClick={onClick}
      />
    ),
    action: <BaseTableActionCell row={row} header={header} onClick={onClick} />,
    date: <BaseTableDateCell row={row} id={id} />,
    avatar: <BaseTableAvatarCell row={row} id={id} header={header} />,
    menu: (
      <BaseTableMenuCell row={row} id={id} header={header} onClick={onClick} />
    ),
    drop: (
      <BaseTableDropDownCell
        row={row}
        id={id}
        header={header}
        onClick={onClick}
      />
    ),
  };
  return Components[header.type ?? 'none'];
}
