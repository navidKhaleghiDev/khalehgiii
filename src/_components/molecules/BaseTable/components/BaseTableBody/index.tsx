import { BaseTableRow } from '../BaseTableRow';

export function BaseTableBody(props) {
  const { row, header, onClick } = props;

  return (
    <tbody className="h-16 bg-white border border-gray-200 ">
      <tr>
        {header.map((hItem) => (
          <td key={hItem.id}>
            <BaseTableRow
              row={row}
              header={header}
              onClick={onClick}
              aria-label={`Row ${hItem.label}`}
            />
          </td>
        ))}
      </tr>
    </tbody>
  );
}
