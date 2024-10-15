export function BaseTableComponentCell(props) {
  const { row, id, header, onClick, type } = props;
  const Component = header[type];
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
