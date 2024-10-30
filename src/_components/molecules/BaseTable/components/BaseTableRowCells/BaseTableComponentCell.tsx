import { BaseTableComponentCellProps, IdItem } from '../../types';

/**
 * Renders a component cell within a table row, using a specified component from the header.
 * If no component is defined in the header, it returns null.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableComponentCellProps<T>} props - The props object for the `BaseTableComponentCell` component.
 * @param {T} props.row - The data object for the current row, containing the information to be displayed.
 * @param {string} props.id - The unique identifier for the row item.
 * @param {Object} props.header - The header object that includes the component to render.
 * @param {React.MouseEventHandler} [props.onClick] - An optional click handler for the cell.
 *
 * @returns {JSX.Element | null} The rendered component or null if no component is specified.
 */
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
