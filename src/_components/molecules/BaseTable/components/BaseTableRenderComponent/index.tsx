import { BaseTableActionCell } from '../BaseTableRowCells/BaseTableActionCell';
import { BaseTableComponentCell } from '../BaseTableRowCells/BaseTableComponentCell';
import { BaseTableNoneCell } from '../BaseTableRowCells/BaseTableNoneCell';

export function BaseTableRenderComponent(props) {
  const { header, row, onClick } = props;

  const id = header?.id;

  const Components = {
    none: <BaseTableNoneCell row={row} id={id} header={header} />,
    component: (
      <BaseTableComponentCell
        type="component"
        row={row}
        header={header}
        id={id}
        onClick={onClick}
      />
    ),

    action: (
      <BaseTableActionCell
        row={row}
        header={header}
        id={id}
        onClick={onClick}
      />
    ),
  };

  return Components[header.type ?? 'none'];
}
