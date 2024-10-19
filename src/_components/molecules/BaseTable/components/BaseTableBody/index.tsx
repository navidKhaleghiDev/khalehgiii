import { NoResult } from '@redesignUi/molecules/NoResult';
import { BaseTableRow } from '../BaseTableRow';

export function BaseTableBody({
  body,
  header,
  onClick,
  isMobile,
  collapseHeader,
}) {
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
        <NoResult />
      )}
    </tbody>
  );
}
