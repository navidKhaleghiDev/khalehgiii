import { BaseTableRow } from '../BaseTableRow';
import { BaseTableNoResult } from '../BaseTableNoResult';
import { BaseTableBodyProps } from '../../types';

export function BaseTableBody({
  body,
  header,
  onClick,
  isMobile,
  collapseHeader,
}: BaseTableBodyProps) {
  return (
    <tbody>
      {body.length >= 1 ? (
        body.map((bodyItem, index) => {
          return (
            <BaseTableRow
              key={bodyItem.id}
              isMobile={isMobile}
              collapseHeader={collapseHeader}
              body={body}
              row={bodyItem}
              header={header}
              onClick={onClick}
              index={index}
            />
          );
        })
      ) : (
        <BaseTableNoResult />
      )}
    </tbody>
  );
}
