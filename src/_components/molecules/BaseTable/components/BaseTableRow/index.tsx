import { BaseTableNoneCell } from './BaseTableRowCells/BaseTableNoneCell';

export function BaseTableRow(props) {
  const { row, header, onClick } = props;

  const id = header?.id;

  const Components = {
    none: <BaseTableNoneCell data={props} />,
  };

  return Components[header?.type ?? 'none'] || null;
}
