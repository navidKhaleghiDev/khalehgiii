import { TableCell } from '../BaseTableTypes';

export function ComponentCell({ row, id, head, onClick }: TableCell) {
  const Component = head?.component;
  if (!Component) {
    return null;
  }

  return (
    <Component
      row={row}
      id={id}
      head={head}
      size={head?.size}
      onClick={onClick}
    />
  );
}
