import { ComponentTableProps } from '../../types';

export function ComponentCell({
  row,
  id,
  header,
  onClick,
}: ComponentTableProps) {
  const Component = header?.component;
  if (!Component) {
    return null;
  }

  return (
    <Component
      row={row}
      id={id}
      head={header}
      size={header?.variant}
      onClick={onClick}
    />
  );
}
