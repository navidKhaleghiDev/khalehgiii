import { BaseTableComponentCellProps, IdItem } from '../../types';

export function BaseTableComponentCell<T extends IdItem>(
  props: BaseTableComponentCellProps<T>
) {
  const { row, id, header, onClick } = props;
  const Component = header.component;
  if (!Component) {
    return null;
  }

  return <Component row={row} id={id} head={header} onClick={onClick} />;
}
