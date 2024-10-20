import React from 'react';
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
            <React.Fragment key={bodyItem.id}>
              <BaseTableRow
                isMobile={isMobile}
                collapseHeader={collapseHeader}
                body={body}
                row={bodyItem}
                header={header}
                onClick={onClick}
                index={index}
              />
            </React.Fragment>
          );
        })
      ) : (
        <BaseTableNoResult />
      )}
    </tbody>
  );
}
