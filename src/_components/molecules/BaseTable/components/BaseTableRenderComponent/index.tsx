import { BaseTableRenderComponentProps, IdItem, TableType } from '../../types';
import { BaseTableActionCell } from '../BaseTableRowCells/BaseTableActionCell';
import { BaseTableComponentCell } from '../BaseTableRowCells/BaseTableComponentCell';
import { BaseTableNoneCell } from '../BaseTableRowCells/BaseTableNoneCell';
import { BaseTableDateCell } from '../BaseTableRowCells/BaseTableDateCell';
import BaseTableAvatarCell from '../BaseTableRowCells/BaseTableAvatarCell';

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
  };
  return Components[header.type ?? 'none'];
}
