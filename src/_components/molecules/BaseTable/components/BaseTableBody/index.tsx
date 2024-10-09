export function BaseTableBody(props) {
  const { row, headers, onClick } = props;
  return (
    <tbody>
      <tr>
        {headers.map((header) => (
          <td>
            {rowCellsComponent({
              row,
              header,
              onClick,
            })}
          </td>
        ))}
      </tr>
    </tbody>
  );
}
