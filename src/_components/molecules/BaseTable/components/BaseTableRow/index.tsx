import { BaseTableNoneCell } from './BaseTableRowCells/BaseTableNoneCell';
function BaseTableRow(props) {
  const { row, header, onClick } = props;

  const id = header?.id;

  const Components = {
    none: <BaseTableNoneCell Data={props} />,
  };

  return Components[header?.type ?? 'none'] || null;
}
