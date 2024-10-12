import { NoResult } from '@ui/molecules/NoResult';
import { BaseTableRow } from '../BaseTableRow';
import { Typography } from '@redesignUi/atoms/Typography/Typography';

export function BaseTableBody(props) {
  const { body, header, onClick } = props;

  return (
    <tbody>
      {body.length >= 1 ? (
        body.map((bodyItem, index) => {
          const borderRadiusT = index === 0 ? 'rounded-t-2xl' : '';
          const borderRadiusB =
            index === body.length - 1 ? 'rounded-b-2xl' : '';
          return (
            <div
              key={bodyItem.id}
              className={`h-16 bg-white border border-gray-200   ${borderRadiusT} ${borderRadiusB}`}
            >
              <tr>
                {header.map((headerItem) => (
                  <td key={headerItem.id} className="px-5">
                    <BaseTableRow
                      row={bodyItem}
                      header={headerItem}
                      onClick={onClick}
                      aria-label={`Row ${headerItem.label}`}
                    />
                  </td>
                ))}
              </tr>
            </div>
          );
        })
      ) : (
        <NoResult />
      )}
    </tbody>
  );
}
